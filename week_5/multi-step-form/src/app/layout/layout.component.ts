import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBar } from '../interface/side-bar';
import { FormsComponent } from '../components/forms/forms.component';
import { SIDE_BAR } from '../data/side-bar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  sidebarItems: SideBar[] = SIDE_BAR;

  currentStep: number = 1;

  onStepChanged(currentStep: number) {
    this.updateSidebarSteps(currentStep);
    this.currentStep = currentStep;
  }

  onSidebarClickStep(step: number) {
    this.updateSidebarSteps(step);
    this.currentStep = step;
  }

  updateSidebarSteps(activeSteps: number) {
    this.sidebarItems.forEach(
      (item) => (item.active = item.step === activeSteps)
    );
  }
}
