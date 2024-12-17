import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  public isToggle = signal<Boolean>(false);

  public toggleTheme(): void {
    this.isToggle.update((prev) => !prev);
  }
}
