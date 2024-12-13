import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Summary } from '../../interface/summary';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  @Input({ required: true }) summary!: Summary;
  @Input({ required: true }) isYearly: boolean = false;
  @Input({ required: true }) totalPrice: string = '';
  @Output() stepChange = new EventEmitter<number>();

  goToStepTwo() {
    this.stepChange.emit(2);
  }
}
