import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../../service/quiz.service';
import { QuizState, SubjectType } from '../../interface/quiz';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizServiceMock: jest.Mocked<QuizService>;

  beforeEach(async () => {
    quizServiceMock = {
      getSelectedSubject: jest.fn(),
      setSubject: jest.fn(),
      getSubjects: jest.fn(),
      clearSubject: jest.fn(),
    } as unknown as jest.Mocked<QuizService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, QuizComponent],
      providers: [{ provide: QuizService, useValue: quizServiceMock }],
    }).compileComponents();

    localStorage.clear();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    const mockSubject: SubjectType = {
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
        {
          question: 'What does CSS stand for?',
          options: [
            'Colorful Style Sheets',
            'Computer Style Sheets',
            'Cascading Style Sheets',
            'Creative Style Sheets',
          ],
          answer: 'Cascading Style Sheets',
        },
      ],
    };
    quizServiceMock.getSelectedSubject.mockReturnValue(of(mockSubject));
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restore quiz state from localStorage on initialization', () => {
    const mockState: QuizState = {
      subjectId: '1',
      currentIndex: 1,
      selectedOptionIndices: [0, 1],
      correctOptionIndices: [null, 1],
      wrongOptionIndices: [1, null],
    };
    localStorage.setItem('quizState', JSON.stringify(mockState));

    component.restoreQuizState();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(mockState.currentIndex);
    expect(component.selectedOptionIndices).toEqual(
      mockState.selectedOptionIndices
    );
    expect(component.correctOptionIndices).toEqual(
      mockState.correctOptionIndices
    );
    expect(component.wrongOptionIndices).toEqual(mockState.wrongOptionIndices);
  });

  it('should fetch selected subject and questions on initialization', () => {
    expect(component.subject).toEqual({
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
        {
          question: 'What does CSS stand for?',
          options: [
            'Colorful Style Sheets',
            'Computer Style Sheets',
            'Cascading Style Sheets',
            'Creative Style Sheets',
          ],
          answer: 'Cascading Style Sheets',
        },
      ],
    });
    expect(component.questions).toEqual([
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
      {
        question: 'What does CSS stand for?',
        options: [
          'Colorful Style Sheets',
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Sheets',
        ],
        answer: 'Cascading Style Sheets',
      },
    ]);
  });

  it('should select an option and save state', () => {
    const mockQuestion = {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Trainer Marking Language',
        'Hyper Text Marketing Language',
        'Hyper Text Markup Language',
        'Hyper Text Markup Leveler',
      ],
      answer: 'Hyper Text Markup Language',
    };

    component.questions = [mockQuestion];
    component.currentIndex = 0;

    component.selectOption(2);

    fixture.detectChanges();

    expect(component.selectedOptionIndex).toBe(2);
    expect(component.selectedOptionIndices[0]).toBe(2);
    expect(localStorage.getItem('quizState')).toContain(
      '"selectedOptionIndices":[2]'
    );
  });

  it('should navigate to the next question', () => {
    component.questions = [
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
      {
        question: 'What does CSS stand for?',
        options: [
          'Colorful Style Sheets',
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Sheets',
        ],
        answer: 'Cascading Style Sheets',
      },
    ];
    component.currentIndex = 0;
    component.correctOptionIndex = 2;

    fixture.detectChanges();
    component.goToNextQuestion();

    expect(component.currentIndex).toBe(1);
    expect(component.selectedOptionIndex).toBeNull();
    expect(localStorage.getItem('quizState')).toContain('"currentIndex":1');
  });

  it('should handle quiz submission correctly', () => {
    component.questions = [
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
    ];
    component.currentIndex = 0;
    component.selectedOptionIndex = 2;
    component.correctOptionIndex = 2;
    component.isLastQuestion = true;

    fixture.detectChanges();
    component.handleSubmit();
    expect(component.showResult).toBeTruthy();
    expect(component.showErrorMessage).toBeFalsy();
  });
});
