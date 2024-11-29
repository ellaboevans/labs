import { Component, Input } from '@angular/core';

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

  playAgain() {
    localStorage.removeItem('selectedSubject');
    localStorage.removeItem('quizState');
    window.location.reload();
  }
}
