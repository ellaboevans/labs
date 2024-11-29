import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { WelcomeTextComponent } from '../welcome-text/welcome-text.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, WelcomeTextComponent, SubjectListComponent],
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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getSelectedSubject().subscribe((subject) => {
      this.subject = subject;
      this.questions = subject ? subject.questions : [];
    });
  }

  goBack() {
    this.subject = null;
    localStorage.removeItem('selectedSubject');
  }

  checkAnswer(option: string, correctAnswer: string, optionIndex: number) {
    this.selectedOptionIndex = optionIndex;

    this.selectedOption = true;

    if (option === correctAnswer) {
      this.correctOptionIndex = optionIndex;
      this.wrongOptionIndex = null;
      console.log('Correct answer selected');
    } else {
      this.wrongOptionIndex = optionIndex;
      this.correctOptionIndex = this.questions[
        this.currentIndex
      ].options.findIndex((opt: string) => opt === correctAnswer);
    }
  }

  // Navigate to the next question
  goToNextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.resetState();
    }
  }

  resetState(): void {
    this.selectedOptionIndex = null;
    this.correctOptionIndex = null;
    this.wrongOptionIndex = null;
    this.selectedOption = false;
  }

  // Navigate to the previous question
  goToPreviousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
