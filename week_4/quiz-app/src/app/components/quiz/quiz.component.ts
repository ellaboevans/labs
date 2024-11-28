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

  checkAnswer(option: string, correctAnswer: string) {
    if (option === correctAnswer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  }

  // Navigate to the next question
  goToNextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  // Navigate to the previous question
  goToPreviousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Map index to letters (A, B, C, D...)
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // ASCII code for 'A' is 65
  }
}
