import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideBar } from '../interface/side-bar';
import { FormsComponent } from '../components/forms/forms.component';
import { SIDE_BAR } from '../data/side-bar';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';
import { Store } from '@ngrx/store';
import {
  selectCurrentStep,
  selectFormState,
  selectIsDone,
} from '../state/form/form.selector';
import { formActions } from '../state/form/form.actions';
import { PersistenceService } from '../services/persistence.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsComponent, ThankYouComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public readonly sidebarItems: SideBar[] = SIDE_BAR;

  private readonly store = inject(Store);
  private readonly persistenceService = inject(PersistenceService);

  public readonly currentStep = this.store.selectSignal(selectCurrentStep);
  public readonly isDone = this.store.selectSignal(selectIsDone);

  private readonly formState = this.store.selectSignal(selectFormState);

  ngOnInit() {
    const savedStep = this.persistenceService.get('formPayload').currentStep;
    if (savedStep) {
      this.store.dispatch(formActions.setCurrentStep({ step: savedStep }));
      this.updateSidebarSteps(this.currentStep());
    }
  }

  onStepChanged(currentStep: number) {
    this.updateSidebarSteps(currentStep);
    this.store.dispatch(formActions.setCurrentStep({ step: currentStep }));
    this.saveCurrentStep();
  }

  onSidebarClickStep(step: number) {
    this.updateSidebarSteps(step);
    this.store.dispatch(formActions.setCurrentStep({ step }));
    this.saveCurrentStep();
  }

  onFormSubmitted() {
    this.isDone();
    this.store.dispatch(formActions.setCurrentStep({ step: 4 }));
    this.saveCurrentStep();

    this.persistenceService.clear();
  }

  updateSidebarSteps(activeStep: number) {
    this.sidebarItems.forEach(
      (item) => (item.active = item.step === activeStep)
    );
  }

  saveCurrentStep() {
    this.persistenceService.set('formPayload', this.formState());
  }
}
