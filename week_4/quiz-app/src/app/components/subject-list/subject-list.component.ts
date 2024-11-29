import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubjectType } from '../../interface/quiz';
import { QuizService } from '../../service/quiz.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss',
})
export class SubjectListComponent implements OnInit {
  subjects: SubjectType[] = [];

  constructor(private quizService: QuizService) {}

  getSubject(): void {
    this.quizService.getSubjects().subscribe((quiz) => (this.subjects = quiz));
  }
  selectSubject(subject: any) {
    this.quizService.setSubject(subject);
  }

  resetSelectedSubject(): void {
    this.quizService.clearSubject();
  }

  ngOnInit(): void {
    this.getSubject();
  }
}
