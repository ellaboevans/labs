import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Summary } from '../../interface/summary';
import { Store } from '@ngrx/store';
import {
  selectCurrentStep,
  selectFormFields,
  selectIsYearly,
} from '../../state/form/form.selector';
import { extractPrice } from '../../utils/extract-price';
import { Addon, Plan } from '../../interface/addon';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  private readonly store = inject(Store);

  @Output() public stepChange = new EventEmitter<number>();

  protected totalPrice!: string;

  public readonly isYearly = this.store.selectSignal(selectIsYearly);

  public readonly currentStep = this.store.selectSignal(selectCurrentStep);

  public readonly formFields = this.store.selectSignal(selectFormFields);

  public goToStepTwo(): void {
    this.stepChange.emit(2);
  }

  public get calculateTotalPrice(): string {
    const planPrice = extractPrice(this.summaryData?.plan?.price);
    const addonPrices = this.summaryData?.addons?.reduce(
      (total: number, addon: Addon) => {
        return total + extractPrice(addon.price);
      },
      0
    );
    const total = planPrice + addonPrices!;
    return (this.totalPrice = this.isYearly()
      ? `$${total}/yr`
      : `$${total}/mo`);
  }

  public get summaryData(): Summary | undefined {
    return this.formFields();
  }
}
