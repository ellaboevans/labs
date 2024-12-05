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

interface StepResults {
  title: string;
  description: string;
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  isYearly = false;
  isForward = false;
  isDone = false;
  plans = PLAN_OPTIONS;
  addons = ADD_ONS;

  @Output() stepChanged = new EventEmitter<number>();
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
      Validators.pattern(/^\d{10,15}$/),
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

    this.summaryData();
  }

  getHeadings(step: number): StepResults {
    switch (step) {
      case 1:
        return {
          title: 'Personal Information',
          description: 'Please provide your personal details',
        };
      case 2:
        return {
          title: 'Select your plan',
          description: 'You have the option of monthly or yearly billing.',
        };
      case 3:
        return {
          title: 'Pick add-ons',
          description: 'Add-ons help enhance your gaming experience.',
        };
      case 4:
        return {
          title: 'Finishing up',
          description: 'Double-check everything looks OK before confirming.',
        };
      default:
        return {
          title: '',
          description: '',
        };
    }
  }

  savedDataToLocalStorage() {
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
    console.log(this.formFields.value);
    localStorage.removeItem('formData');
    this.isDone = true;
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
  }

  selectPlan(plan: Plan) {
    this.formFields.patchValue({
      plan: {
        type: plan.type,
        price: plan.price,
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
        addons: updatedAddons,
      });
    } else {
      this.formFields.patchValue({
        addons: [...selectedAddons, addonValue],
      });
    }

    this.savedDataToLocalStorage();
  }

  isAddonSelected(selectedAddonValue: Addon): boolean {
    const selectedAddons = this.formFields.get('addons')?.value || [];
    return selectedAddons.some(
      (a: Addon) => a.type === selectedAddonValue.type
    );
  }

  summaryData() {
    const data = localStorage.getItem('formData');
    if (data) {
      console.log(data);
    }
  }
}
