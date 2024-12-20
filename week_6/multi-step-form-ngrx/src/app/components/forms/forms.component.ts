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
import { SummaryComponent } from '../summary/summary.component';
import { fullEmailValidator } from '../../validations/full-email-validator';
import { Store } from '@ngrx/store';
import { formActions } from '../../state/form/form.actions';
import { FormPayload, StepPayload } from '../../interface/form-payload';
import {
  selectCurrentStep,
  selectFormState,
  selectIsDone,
  selectIsForward,
} from '../../state/form/form.selector';
import { PersistenceService } from '../../services/persistence.service';

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
  public readonly plans = PLAN_OPTIONS;
  public readonly addons = ADD_ONS;

  private readonly store = inject(Store);
  private readonly persistenceService = inject(PersistenceService);

  private readonly validEmailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  public readonly getHeadings = getFormHeadings;

  @Output() public readonly stepChanged = new EventEmitter<number>();
  @Output() public readonly formSubmitted = new EventEmitter<void>();

  public readonly currentStep = this.store.selectSignal(selectCurrentStep);
  public isForward = this.store.selectSignal(selectIsForward);
  public isDone = this.store.selectSignal(selectIsDone);
  private formState = this.store.selectSignal(selectFormState);

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
    const savedData = this.persistenceService.get('formPayload');
    if (savedData) {
      this.formFields.patchValue(savedData.formFields);
      this.store.dispatch(
        formActions.setIsYearly({ data: savedData.isYearly })
      );
    }
  }

  public gotoNextStep(): void {
    this.isForward();

    const stepPayload = this.formFields.value as StepPayload;

    if (this.currentStep() < 4) {
      this.store.dispatch(formActions.goToNextStep({ stepPayload }));
      this.persistenceService.set('formPayload', this.formState());
      this.stepChanged.emit(this.currentStep());
    }
  }

  public submitForm(): void {
    const formData = this.formFields.value;

    const payload: FormPayload = {
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone!,
      plan: {
        type: formData.plan?.type!,
        price: this.isChecked
          ? this.plans.find((plan) => plan.type === formData.plan?.type)?.yearly
              .price
          : formData.plan?.price!,
        extras: this.isChecked
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
          price: this.isChecked
            ? (addonDetails?.yearly.price as string)
            : (addonDetails?.price as string),
        };
      }),
    };

    this.store.dispatch(formActions.submitForm({ payload }));

    this.formSubmitted.emit(); // this when emitted disables the click even on step tracker
    this.persistenceService.clear();
  }

  public gotoPreviousStep(): void {
    this.isForward();
    if (this.currentStep() > 1) {
      this.store.dispatch(formActions.goToPreviousStep());
      this.stepChanged.emit(this.currentStep());
    }
  }

  public togglePlan(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.store.dispatch(formActions.setIsYearly({ data: checkbox.checked }));

    this.persistenceService.set('formPayload', this.formState());
    this.isChecked;

    // Update plan prices in the form based on the toggle state
    const currentPlanType = this.formFields.get('plan.type')?.value;
    const currentPlan = this.plans.find(
      (plan) => plan.type === currentPlanType
    );
    if (currentPlan) {
      this.formFields.patchValue({
        plan: {
          price: this.isChecked ? currentPlan.yearly.price : currentPlan.price,
        },
      });
    }
  }

  public selectPlan(plan: Plan): void {
    this.formFields.patchValue({
      plan: {
        type: plan.type,
        price: this.isChecked ? plan.yearly?.price : plan.price,
      },
    });
  }

  public selectAddon(addonValue: Addon): void {
    const selectedAddons = this.formFields.get('addons')?.value || [];

    if (selectedAddons.some((addon: Addon) => addonValue.type === addon.type)) {
      const updatedAddons = selectedAddons.filter(
        (addon: Addon) => addonValue.type !== addon.type
      );
      this.formFields.patchValue({
        addons: updatedAddons.map((addon) => ({
          ...addon,
          price: (this.isChecked ? addon.yearly?.price : addon.price) as string,
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
            price: (this.isChecked
              ? addonValue.yearly?.price
              : addonValue.price) as string,
          },
        ],
      });
    }
  }

  public isAddonSelected(selectedAddonValue: Addon): boolean {
    const selectedAddons = this.formFields.get('addons')?.value || [];
    return selectedAddons.some(
      (addon: Addon) => addon.type === selectedAddonValue.type
    );
  }

  public onStepChanged(step: number): void {
    this.stepChanged.emit(step);
  }

  public resetForm(): void {
    this.formFields.reset();
    this.store.dispatch(formActions.resetForm());
    this.store.dispatch(formActions.setCurrentStep({ step: 1 }));
    this.persistenceService.remove('formPayload');
    this.persistenceService.remove('currentStep');
    this.stepChanged.emit(this.currentStep());
  }

  public get isChecked(): boolean {
    return this.persistenceService.get('formPayload').isYearly;
  }
}
