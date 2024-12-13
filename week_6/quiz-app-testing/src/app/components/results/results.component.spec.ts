import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { SubjectType } from '../../interface/quiz';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
    }).compileComponents();

    const mockSubject: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };
    localStorage.setItem('selectedSubject', JSON.stringify(mockSubject));

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedSubject from localStorage', () => {
    const mockSubject: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };

    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedSubject).toEqual(mockSubject);
  });

  it('should remove selectedSubject and quizState from localStorage and reload the page on playAgain', () => {
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: mockReload },
    });

    localStorage.setItem(
      'selectedSubject',
      JSON.stringify({
        id: '1',
        title: 'HTML',
        icon: 'html-icon',
        questions: [],
      })
    );

    localStorage.setItem(
      'quizState',
      JSON.stringify({
        currentIndex: 0,
      })
    );

    component.playAgain();

    expect(localStorage.getItem('selectedSubject')).toBeNull();
    expect(localStorage.getItem('quizState')).toBeNull();
    expect(mockReload).toHaveBeenCalled();
  });
});
