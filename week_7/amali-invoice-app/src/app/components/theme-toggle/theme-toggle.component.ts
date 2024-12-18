import { Component, inject, OnInit, signal } from '@angular/core';
import { ThemeServiceService } from '../../services/theme-service/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent implements OnInit {
  public isToggle = signal<Boolean>(false);

  private readonly themeService = inject(ThemeServiceService);

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  public toggleTheme(): void {
    this.isToggle.update((prev) => !prev);
    this.themeService.toggleTheme();
  }
}
