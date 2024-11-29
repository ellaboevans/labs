import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { WelcomeTextComponent } from '../welcome-text/welcome-text.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ResultsComponent } from '../results/results.component';

interface QuizState {
  subjectId: string | null;
  currentIndex: number;
  selectedOptionIndices: number[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeTextComponent,
    SubjectListComponent,
    ResultsComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  subject: any = null;
  questions: any[] = [];
  currentIndex: number = 0;
  selectedOptionIndex: number | null = null;
  correctOptionIndex: number | null = null;
  wrongOptionIndex: number | null = null;
  selectedOption: boolean = false;
  showErrorMessage: boolean = false;
  showResult: boolean = false;
  isLastQuestion: boolean = false;
  selectedOptionIndices: number[] = [];
  userScore: number = 0;
  hasSubmittedLastQuestion: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.restoreQuizState();

    this.quizService.getSelectedSubject().subscribe((subject) => {
      this.subject = subject;
      this.questions = subject ? subject.questions : [];

      if (this.selectedOptionIndices.length > 0) {
        if (this.selectedOptionIndices[this.currentIndex] !== undefined) {
          const restoredOptionIndex =
            this.selectedOptionIndices[this.currentIndex];
          const restoredOption =
            this.questions[this.currentIndex].options[restoredOptionIndex];
          const correctAnswer = this.questions[this.currentIndex].answer;

          this.checkAnswer(restoredOption, correctAnswer, restoredOptionIndex);
        }
      }
    });
  }

  // Save current quiz state to localStorage
  saveQuizState() {
    if (!this.subject) return;

    const quizState: QuizState = {
      subjectId: this.subject.id,
      currentIndex: this.currentIndex,
      selectedOptionIndices: this.selectedOptionIndices,
    };

    localStorage.setItem('quizState', JSON.stringify(quizState));
  }

  // Restore quiz state from localStorage
  restoreQuizState() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const parsedState: QuizState = JSON.parse(savedState);
      this.currentIndex = parsedState.currentIndex;
      this.selectedOptionIndices = parsedState.selectedOptionIndices || [];
    }
  }

  checkAnswer(option: string, correctAnswer: string, optionIndex: number) {
    this.selectedOptionIndex = optionIndex;
    this.selectedOption = true;
    this.showErrorMessage = false;

    // Store the selected option for this question
    this.selectedOptionIndices[this.currentIndex] = optionIndex;
    this.saveQuizState();

    if (option === correctAnswer) {
      this.correctOptionIndex = optionIndex;
      this.wrongOptionIndex = null;
      this.userScore++;
    } else {
      this.wrongOptionIndex = optionIndex;
      this.correctOptionIndex = this.questions[
        this.currentIndex
      ].options.findIndex((opt: string) => opt === correctAnswer);
    }
  }

  goToNextQuestion(): void {
    if (!this.selectedOption) {
      this.showErrorMessage = true;
      return;
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.saveQuizState();
      this.resetState();

      this.isLastQuestion = this.currentIndex === this.questions.length - 1;
    }
  }

  resetState(): void {
    this.selectedOptionIndex = null;
    this.correctOptionIndex = null;
    this.wrongOptionIndex = null;
    this.selectedOption = false;
    this.showErrorMessage = false;

    // Restore the selected option for the new current question if it exists
    if (this.selectedOptionIndices[this.currentIndex] !== undefined) {
      const restoredOptionIndex = this.selectedOptionIndices[this.currentIndex];
      const restoredOption =
        this.questions[this.currentIndex].options[restoredOptionIndex];
      const correctAnswer = this.questions[this.currentIndex].answer;

      this.checkAnswer(restoredOption, correctAnswer, restoredOptionIndex);
    }

    // if (this.currentIndex === this.questions.length - 1) {
    //   this.showResult = true;
    // }
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  handleSubmitOrShowResults() {
    if (this.currentIndex === this.questions.length - 1) {
      if (this.selectedOption) {
        this.showResult = true;
      } else {
        this.showErrorMessage = true;
      }
    } else {
      this.goToNextQuestion();
    }
  }
}
