import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PLAN_OPTIONS } from '../../data/plan-options';
import { ADD_ONS } from '../../data/addons';
import { Addon, Plan } from '../../interface/addon';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { getFormHeadings } from '../../utils/get-form-headings';
import { extractPrice } from '../../utils/extract-price';
import { SummaryComponent } from '../summary/summary.component';
import { fullEmailValidator } from '../../validations/full-email-validator';
import { Store } from '@ngrx/store';
import { formActions } from '../../store/form/form.actions';
import { FormPayload } from '../../interface/form-payload';
import {
  selectCurrentStep,
  selectIsDone,
  selectIsForward,
  selectIsYearly,
} from '../../store/form/form.reducers';
import { Summary } from '../../interface/summary';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapitalizePipe,
    SummaryComponent,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly plans = PLAN_OPTIONS;
  public readonly addons = ADD_ONS;

  private readonly validEmailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  public readonly getHeadings = getFormHeadings;

  @Output() public readonly stepChanged = new EventEmitter<number>();
  @Output() public readonly formSubmitted = new EventEmitter<void>();

  public readonly currentStep = this.store.selectSignal(selectCurrentStep);
  public isForward = this.store.selectSignal(selectIsForward);
  public isDone = this.store.selectSignal(selectIsDone);
  public isYearly = this.store.selectSignal(selectIsYearly);

  readonly formFields = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      fullEmailValidator(this.validEmailPattern),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+(\d{1,3})\d{10,14}$/),
    ]),
    plan:
      new FormGroup({
        type: new FormControl(''),
        price: new FormControl(''),
      }) ?? [],
    addons: new FormControl<Addon[]>([]),
  });

  ngOnInit(): void {
    const savedData = localStorage.getItem('formData');
    if (savedData) return this.formFields.setValue(JSON.parse(savedData));
  }

  private savedDataToLocalStorage(): void {
    localStorage.setItem('formData', JSON.stringify(this.formFields.value));
  }

  public gotoNextStep(): void {
    this.isForward();

    this.savedDataToLocalStorage();

    if (this.currentStep() < 4) {
      this.store.dispatch(formActions.goToNextStep());
      this.stepChanged.emit(this.currentStep());
    }
  }

  public submitForm(): void {
    const formData = this.formFields.getRawValue();

    const payload: FormPayload = {
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone!,
      plan: {
        type: formData.plan?.type!,
        price: this.isYearly()
          ? this.plans.find((plan) => plan.type === formData.plan?.type)?.yearly
              .price
          : formData.plan?.price!,
        extras: this.isYearly()
          ? this.plans.find((plan) => plan.type === formData.plan?.type)?.yearly
              .extras
          : null!,
      },
      addons: formData.addons!.map((addon) => {
        const addonDetails = this.addons.find(
          (item) => item.type === addon.type
        );
        return {
          type: addon.type,
          description: addon.description,
          title: addon.title,
          price: this.isYearly()
            ? (addonDetails?.yearly.price as string)
            : (addonDetails?.price as string),
        };
      }),
    };

    this.store.dispatch(formActions.submitForm({ payload }));

    this.formSubmitted.emit(); // this when emitted disables the click even on step tracker
    this.removeItemFromStorage();
  }

  private removeItemFromStorage(): void {
    localStorage.removeItem('formData');
    localStorage.removeItem('currentStep()');
  }

  public gotoPreviousStep(): void {
    this.isForward();
    if (this.currentStep() > 1) {
      this.store.dispatch(formActions.goToPreviousStep());
      this.store.dispatch(
        formActions.setCurrentStep({ step: this.currentStep() })
      );
      this.stepChanged.emit(this.currentStep());
    }
  }

  public togglePlan(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isYearly();
    this.store.dispatch(formActions.setIsYearly({ data: checkbox.checked }));

    // Update plan prices in the form based on the toggle state
    const currentPlanType = this.formFields.get('plan.type')?.value;
    const currentPlan = this.plans.find(
      (plan) => plan.type === currentPlanType
    );
    if (currentPlan) {
      this.formFields.patchValue({
        plan: {
          price: this.isYearly() ? currentPlan.yearly.price : currentPlan.price,
        },
      });
    }

    this.savedDataToLocalStorage();
  }

  public selectPlan(plan: Plan) {
    this.formFields.patchValue({
      plan: {
        type: plan.type,
        price: this.isYearly() ? plan.yearly?.price : plan.price,
      },
    });
  }

  public selectAddon(addonValue: Addon) {
    const selectedAddons = this.formFields.get('addons')?.value || [];

    if (selectedAddons.some((addon: Addon) => addonValue.type === addon.type)) {
      const updatedAddons = selectedAddons.filter(
        (addon: Addon) => addonValue.type !== addon.type
      );
      this.formFields.patchValue({
        addons: updatedAddons.map((addon) => ({
          ...addon,
          price: (this.isYearly()
            ? addon.yearly?.price
            : addon.price) as string,
        })),
      });
    } else {
      this.formFields.patchValue({
        addons: [
          ...selectedAddons,
          {
            description: addonValue.description,
            title: addonValue.title,
            type: addonValue.type,
            price: (this.isYearly()
              ? addonValue.yearly?.price
              : addonValue.price) as string,
          },
        ],
      });
    }

    this.savedDataToLocalStorage();
  }

  public isAddonSelected(selectedAddonValue: Addon): boolean {
    const selectedAddons = this.formFields.get('addons')?.value || [];
    return selectedAddons.some(
      (addon: Addon) => addon.type === selectedAddonValue.type
    );
  }

  public get calculateTotalPrice(): string {
    const planPrice = extractPrice(this.summaryData?.plan?.price);
    const addonPrices = this.summaryData?.addons?.reduce(
      (total: number, addon: Addon) => {
        return total + extractPrice(addon.price);
      },
      0
    );
    const total = planPrice + (addonPrices || 0);
    return this.isYearly() ? `$${total}/yr` : `$${total}/mo`;
  }

  public get summaryData(): Summary | undefined {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : undefined;
  }

  public onStepChanged(step: number): void {
    this.stepChanged.emit(step);
  }

  public resetForm(): void {
    this.formFields.reset();
    this.store.dispatch(formActions.resetForm());
    this.store.dispatch(formActions.setCurrentStep({ step: 1 }));
    this.removeItemFromStorage();
    this.stepChanged.emit(this.currentStep());
  }
}
