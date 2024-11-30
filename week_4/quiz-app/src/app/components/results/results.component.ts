import { Component, Input } from '@angular/core';
import { SubjectType } from '../../interface/quiz';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() score!: number;
  @Input() outOfTotal!: number;
  @Input() selectedSubject!: SubjectType | null;

  constructor() {
    const subject = localStorage.getItem('selectedSubject');
    this.selectedSubject = subject ? JSON.parse(subject) : null;
  }

  playAgain() {
    localStorage.removeItem('selectedSubject');
    localStorage.removeItem('quizState');
    window.location.reload();
  }
}
