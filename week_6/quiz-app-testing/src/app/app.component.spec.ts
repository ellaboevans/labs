import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuizService } from './service/quiz.service';
import { SubjectType } from './interface/quiz';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let quizServiceMock: jest.Mocked<QuizService>;

  beforeEach(async () => {
    quizServiceMock = {
      getSelectedSubject: jest.fn(),
      clearSubject: jest.fn(),
    } as unknown as jest.Mocked<QuizService>;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: QuizService, useValue: quizServiceMock }],
    }).compileComponents();

    let mockQuizData: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [
        {
          question: 'What does HTML stand for?',
          options: [
            'Hyper Trainer Marking Language',
            'Hyper Text Marketing Language',
            'Hyper Text Markup Language',
            'Hyper Text Markup Leveler',
          ],
          answer: 'Hyper Text Markup Language',
        },
      ],
    };

    quizServiceMock.getSelectedSubject.mockReturnValue(of(mockQuizData));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle theme correctly', () => {
    const initialTheme = component.isDarkMode;
    component.toggleTheme();
    expect(component.isDarkMode).toBe(!initialTheme);
    const themeClass = component.isDarkMode ? 'dark-mode' : 'light-mode';
    expect(document.body.className).toBe(themeClass);
  });

  it('should persist theme on app initialization', () => {
    localStorage.setItem('theme', 'dark-mode');
    component.ngOnInit();
    expect(document.body.className).toBe('dark-mode');
    expect(component.isDarkMode).toBe(true);

    localStorage.setItem('theme', 'light-mode');
    component.ngOnInit();
    expect(document.body.className).toBe('light-mode');
    expect(component.isDarkMode).toBe(false);
  });

  it('should reset title and clear subject', () => {
    let mockQuizData: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [
        {
          question: 'What does HTML stand for?',
          options: [
            'Hyper Trainer Marking Language',
            'Hyper Text Marketing Language',
            'Hyper Text Markup Language',
            'Hyper Text Markup Leveler',
          ],
          answer: 'Hyper Text Markup Language',
        },
      ],
    };
    component.selectedSubject = mockQuizData;
    component.resetTitle();
    expect(component.selectedSubject.title).toBe('');
    expect(component.selectedSubject.icon).toBe('');
    expect(quizServiceMock.clearSubject).toHaveBeenCalled();
  });

  it('should get the selected subject from the quiz service on initialization', () => {
    expect(component.selectedSubject.title).toBe('HTML');
    expect(component.selectedSubject.icon).toBe('html-icon');
    expect(quizServiceMock.getSelectedSubject).toHaveBeenCalled();
  });
});
