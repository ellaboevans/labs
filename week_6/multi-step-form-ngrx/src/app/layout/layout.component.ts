import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideBar } from '../interface/side-bar';
import { FormsComponent } from '../components/forms/forms.component';
import { SIDE_BAR } from '../data/side-bar';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';
import { Store } from '@ngrx/store';
import { selectCurrentStep, selectIsDone } from '../store/form/form.reducers';
import { formActions } from '../store/form/form.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsComponent, ThankYouComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  private store = inject(Store);
  sidebarItems: SideBar[] = SIDE_BAR;
  currentStep = this.store.selectSignal(selectCurrentStep);
  isDone = this.store.selectSignal(selectIsDone);

  ngOnInit() {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      this.store.dispatch(
        formActions.setCurrentStep({ step: parseInt(savedStep) })
      );
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

    localStorage.removeItem('currentStep');
  }

  updateSidebarSteps(activeStep: number) {
    this.sidebarItems.forEach(
      (item) => (item.active = item.step === activeStep)
    );
  }

  saveCurrentStep() {
    localStorage.setItem('currentStep', this.currentStep().toString());
  }
}
