import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Summary } from '../../interface/summary';
import { Store } from '@ngrx/store';
import { selectIsYearly } from '../../store/form/form.reducers';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  private readonly store = inject(Store);

  @Input({ required: true }) public summary!: Summary;
  @Input({ required: true }) public totalPrice: string = '';
  @Output() public stepChange = new EventEmitter<number>();

  public readonly isYearly = this.store.selectSignal(selectIsYearly);

  public goToStepTwo(): void {
    this.stepChange.emit(2);
  }
}
