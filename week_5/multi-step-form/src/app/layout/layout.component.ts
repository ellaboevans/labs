import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBar } from '../interface/side-bar';
import { FormsComponent } from '../components/forms/forms.component';
import { SIDE_BAR } from '../data/side-bar';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsComponent, ThankYouComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  sidebarItems: SideBar[] = SIDE_BAR;
  currentStep: number = 1;
  isDone: boolean = false;

  ngOnInit() {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      this.currentStep = parseInt(savedStep, 10);
      this.isDone = this.currentStep === 4;
      this.updateSidebarSteps(this.currentStep);
    }
  }

  onStepChanged(currentStep: number) {
    this.updateSidebarSteps(currentStep);
    this.currentStep = currentStep;
    this.saveCurrentStep();
  }

  onSidebarClickStep(step: number) {
    if (this.isDone && this.currentStep === 4) return;

    this.updateSidebarSteps(step);
    this.currentStep = step;
    this.saveCurrentStep();
  }

  onFormSubmitted() {
    this.isDone = true;
    this.currentStep = 4;
    this.saveCurrentStep();

    localStorage.removeItem('currentStep');
  }

  updateSidebarSteps(activeStep: number) {
    this.sidebarItems.forEach(
      (item) => (item.active = item.step === activeStep)
    );
  }

  saveCurrentStep() {
    localStorage.setItem('currentStep', this.currentStep.toString());
  }
}
