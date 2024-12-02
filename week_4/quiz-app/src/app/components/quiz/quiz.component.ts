import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { WelcomeTextComponent } from '../welcome-text/welcome-text.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ResultsComponent } from '../results/results.component';
import { Question, QuizState, SubjectType } from '../../interface/quiz';

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
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  subject: SubjectType | null = null;
  questions: Question[] = [];
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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.restoreQuizState();

    this.quizService.getSelectedSubject().subscribe((subject) => {
      this.subject = subject;
      this.questions = subject ? subject.questions : [];

      if (this.selectedOptionIndices.length > 0) {
        const restoredOptionIndex =
          this.selectedOptionIndices[this.currentIndex];
        this.selectedOptionIndex = restoredOptionIndex;
      }
    });
  }

  restoreQuizState() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const parsedState: QuizState = JSON.parse(savedState);
      this.currentIndex = parsedState.currentIndex || 0;
      this.selectedOptionIndices = parsedState.selectedOptionIndices || [];
      this.userScore = this.calculateScore(this.selectedOptionIndices);
      this.restoreCurrentQuestionState();
    }
  }

  calculateScore(selectedOptionIndices: number[]): number {
    return selectedOptionIndices.reduce((score, selectedIndex, index) => {
      const question = this.questions[index];
      const correctAnswer = question?.answer;
      return question?.options[selectedIndex] === correctAnswer
        ? score + 1
        : score;
    }, 0);
  }

  restoreCurrentQuestionState() {
    const restoredOptionIndex = this.selectedOptionIndices[this.currentIndex];
    if (restoredOptionIndex !== undefined) {
      this.selectedOptionIndex = restoredOptionIndex;

      const question = this.questions[this.currentIndex];
      if (question) {
        const correctAnswer = question.answer;

        if (question.options[restoredOptionIndex] === correctAnswer) {
          this.correctOptionIndex = restoredOptionIndex;
          this.wrongOptionIndex = null;
        } else {
          this.wrongOptionIndex = restoredOptionIndex;
          this.correctOptionIndex = question.options.findIndex(
            (opt: string) => opt === correctAnswer
          );
        }
      }
    }
  }

  saveQuizState() {
    if (!this.subject) return;

    const quizState: QuizState = {
      subjectId: this.subject.id,
      currentIndex: this.currentIndex,
      selectedOptionIndices: this.selectedOptionIndices,
    };

    localStorage.setItem('quizState', JSON.stringify(quizState));
  }

  selectOption(optionIndex: number) {
    this.selectedOptionIndex = optionIndex;
    this.selectedOptionIndices[this.currentIndex] = optionIndex; // Save per question
    this.saveQuizState();
    this.selectedOption = true;
    this.showErrorMessage = false;
  }

  checkAnswer() {
    if (this.selectedOptionIndex === null) return;

    const selectedOption =
      this.questions[this.currentIndex].options[this.selectedOptionIndex];
    const correctAnswer = this.questions[this.currentIndex].answer;

    if (selectedOption === correctAnswer) {
      this.correctOptionIndex = this.selectedOptionIndex;
      this.wrongOptionIndex = null;
      this.userScore++;
    } else {
      this.wrongOptionIndex = this.selectedOptionIndex;
      this.correctOptionIndex = this.questions[
        this.currentIndex
      ].options.findIndex((opt: string) => opt === correctAnswer);
    }
  }

  goToNextQuestion() {
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

  resetState() {
    this.selectedOptionIndex = null;
    this.correctOptionIndex = null;
    this.wrongOptionIndex = null;
    this.selectedOption = false;
    this.showErrorMessage = false;

    if (this.selectedOptionIndices[this.currentIndex] !== undefined) {
      const restoredOptionIndex = this.selectedOptionIndices[this.currentIndex];
      this.selectedOptionIndex = restoredOptionIndex;
    }
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  handleSubmit() {
    if (this.selectedOptionIndex === null) {
      this.showErrorMessage = true;
      return;
    }

    if (this.correctOptionIndex === null && this.wrongOptionIndex === null) {
      this.checkAnswer();
      if (this.currentIndex === this.questions.length - 1) {
        this.isLastQuestion = true;
      }
    } else {
      if (this.isLastQuestion) {
        this.showResult = true;
      } else {
        this.goToNextQuestion();
      }
    }
  }
}
