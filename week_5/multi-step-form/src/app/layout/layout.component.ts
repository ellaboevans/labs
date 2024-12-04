import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBar } from '../interface/side-bar';
import { FormsComponent } from '../components/forms/forms.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  sidebarItems: SideBar[] = [
    {
      step: 1,
      label: 'your info',
      active: true,
    },
    {
      step: 2,
      label: 'select Plan',
      active: false,
    },
    {
      step: 3,
      label: 'add-ons',
      active: false,
    },
    {
      step: 4,
      label: 'summary',
      active: false,
    },
  ];
}
