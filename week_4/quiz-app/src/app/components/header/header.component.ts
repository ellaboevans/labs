import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectType } from '../../interface/quiz';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() themeToggle = new EventEmitter<void>();
  @Input() selectedSubject!: SubjectType;
  isDarkMode = false;

  onThemeToggle() {
    this.isDarkMode = !this.isDarkMode;
    this.themeToggle.emit();
  }
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    this.isDarkMode = savedTheme === 'dark-mode';
  }
}
