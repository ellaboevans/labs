import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  isYearly = false;
  isForward = false;
  isDone = false;
  plans = PLAN_OPTIONS;
  addons = ADD_ONS;

  getHeadings = getFormHeadings;

  @Output() stepChanged = new EventEmitter<number>();
  @Output() formSubmitted = new EventEmitter();
  @Input() currentStep: number = 1;

  formFields = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+(\d{1,3})\d{10,14}$/),
    ]),
    plan: new FormGroup({
      type: new FormControl(''),
      price: new FormControl(''),
    }),
    addons: new FormControl<Addon[]>([]),
  });

  ngOnInit(): void {
    const savedData = localStorage.getItem('formData');
    if (savedData) return this.formFields.setValue(JSON.parse(savedData));
  }

  savedDataToLocalStorage(): void {
    localStorage.setItem('formData', JSON.stringify(this.formFields.value));
    console.log('Form data saved to local storage');
  }

  gotoNextStep() {
    this.isForward = true;
    if (this.currentStep === 1) {
      const name = this.formFields.get('name');
      const email = this.formFields.get('email');
      const phone = this.formFields.get('phone');

      if (name?.invalid || email?.invalid || phone?.invalid) {
        name?.markAsTouched();
        email?.markAsTouched();
        phone?.markAsTouched();
        return;
      }
    }

    this.savedDataToLocalStorage();

    if (this.currentStep < 4) {
      this.currentStep++;
      this.stepChanged.emit(this.currentStep);
    }
  }

  submitForm() {
    const formData = this.formFields.value;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      plan: {
        type: formData.plan?.type,
        price: this.isYearly
          ? this.plans.find((plan) => plan.type === formData.plan?.type)?.yearly
              .price
          : formData.plan?.price,
        extras: this.isYearly
          ? this.plans.find((plan) => plan.type === formData.plan?.type)?.yearly
              .extras
          : null,
      },
      addons: formData.addons?.map((addon) => {
        const addonDetails = this.addons.find(
          (item) => item.type === addon.type
        );
        return {
          type: addon.type,
          description: addon.description,
          title: addon.title,
          price: this.isYearly
            ? addonDetails?.yearly.price
            : addonDetails?.price,
        };
      }),
    };

    console.log(payload);
    localStorage.setItem('payload', JSON.stringify(payload));
    this.removeItemFromStorage();
    this.isDone = true;
    this.formSubmitted.emit(); // this when emitted disables the click even on step tracker
  }

  removeItemFromStorage() {
    localStorage.removeItem('formData');
    localStorage.removeItem('currentStep');
  }

  gotoPreviousStep() {
    this.isForward = false;
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepChanged.emit(this.currentStep);
    }
  }

  togglePlan(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isYearly = checkbox.checked;

    // Update plan prices in the form based on the toggle state
    const currentPlanType = this.formFields.get('plan.type')?.value;
    const currentPlan = this.plans.find(
      (plan) => plan.type === currentPlanType
    );
    if (currentPlan) {
      this.formFields.patchValue({
        plan: {
          price: this.isYearly ? currentPlan.yearly.price : currentPlan.price,
        },
      });
    }

    this.savedDataToLocalStorage();
  }

  selectPlan(plan: Plan) {
    this.formFields.patchValue({
      plan: {
        type: plan.type,
        price: this.isYearly ? plan.yearly?.price : plan.price,
      },
    });
  }

  selectAddon(addonValue: Addon) {
    const selectedAddons = this.formFields.get('addons')?.value || [];

    if (selectedAddons.some((addon: Addon) => addonValue.type === addon.type)) {
      const updatedAddons = selectedAddons.filter(
        (addon: Addon) => addonValue.type !== addon.type
      );
      this.formFields.patchValue({
        addons: updatedAddons.map((addon) => ({
          ...addon,
          price: (this.isYearly ? addon.yearly?.price : addon.price) as string,
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
            price: (this.isYearly
              ? addonValue.yearly?.price
              : addonValue.price) as string,
          },
        ],
      });
    }

    this.savedDataToLocalStorage();
  }

  isAddonSelected(selectedAddonValue: Addon): boolean {
    const selectedAddons = this.formFields.get('addons')?.value || [];
    return selectedAddons.some(
      (addon: Addon) => addon.type === selectedAddonValue.type
    );
  }

  get calculateTotalPrice(): string {
    const planPrice = extractPrice(this.summaryData?.plan?.price);
    const addonPrices = this.summaryData?.addons?.reduce(
      (total: number, addon: Addon) => {
        return total + extractPrice(addon.price);
      },
      0
    );
    const total = planPrice + (addonPrices || 0);
    return this.isYearly ? `$${total}/yr` : `$${total}/mo`;
  }

  get summaryData() {
    const data = localStorage.getItem('formData');
    if (data) return JSON.parse(data);
  }

  onStepChanged(step: number) {
    this.stepChanged.emit(step);
  }

  resetForm() {
    this.formFields.reset();
    this.currentStep = 1;
    this.removeItemFromStorage();
    this.stepChanged.emit(this.currentStep);
  }
}
