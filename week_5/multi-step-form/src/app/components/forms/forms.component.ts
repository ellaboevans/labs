import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PLAN_OPTIONS } from '../../data/plan-options';

interface StepResults {
  title: string;
  description: string;
}

@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  currentStep: number = 1;
  plans = PLAN_OPTIONS;

  formFields = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
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
      this.currentStep++;
    }
  }

  submitForm() {
    console.log(this.formFields.value);
  }

  gotoPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
