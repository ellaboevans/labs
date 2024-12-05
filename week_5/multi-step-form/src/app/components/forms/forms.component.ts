import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PLAN_OPTIONS } from '../../data/plan-options';
import { ADD_ONS } from '../../data/addons';

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
export class FormsComponent {
  isYearly = false;
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
    addons: new FormGroup({
      type: new FormControl(''),
      package: new FormControl(''),
      price: new FormControl(''),
    }),
  });

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

  gotoNextStep() {
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
    if (this.currentStep < 4) {
      this.currentStep++;
      this.stepChanged.emit(this.currentStep);
    }
  }

  submitForm() {
    console.log(this.formFields);
  }

  gotoPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepChanged.emit(this.currentStep);
    }
  }

  togglePlan(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isYearly = checkbox.checked;
  }
}
