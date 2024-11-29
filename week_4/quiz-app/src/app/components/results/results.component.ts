import { Component, Input } from '@angular/core';
import { SubjectType } from '../../interface/quiz';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  @Input() score!: number;
  @Input() outOfTotal!: number;
  @Input() selectedSubject!: SubjectType;

  constructor() {
    this.selectedSubject = JSON.parse(localStorage.getItem('selectedSubject')!);
  }

  playAgain() {
    localStorage.removeItem('selectedSubject');
    localStorage.removeItem('quizState');
    window.location.reload();
  }
}
