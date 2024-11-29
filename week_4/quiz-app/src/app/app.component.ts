import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizService } from './service/quiz.service';
import { SubjectType } from './interface/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, QuizComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  selectedSubject!: SubjectType;

  constructor(private quizService: QuizService) {
    // Get the selected subject from QuizService
    this.quizService.getSelectedSubject().subscribe((selectedSubject) => {
      if (selectedSubject) {
        this.selectedSubject = selectedSubject;
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-mode' : 'light-mode';
    document.body.className = themeClass;
    localStorage.setItem('theme', themeClass);
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    this.isDarkMode = savedTheme === 'dark-mode';
  }

  resetTitle(): void {
    this.quizService.clearSubject();
    this.selectedSubject.title = '';
    this.selectedSubject.icon = null;
  }
}
