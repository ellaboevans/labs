import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListComponent } from './subject-list.component';
import { QuizService } from '../../service/quiz.service';
import { SubjectType } from '../../interface/quiz';
import { of } from 'rxjs';

describe('SubjectListComponent', () => {
  let component: SubjectListComponent;
  let fixture: ComponentFixture<SubjectListComponent>;
  let quizService: jest.Mocked<QuizService>;

  beforeEach(async () => {
    quizService = {
      getSubjects: jest.fn(),
      setSubject: jest.fn(),
      getSelectedSubject: jest.fn(),
      clearSubject: jest.fn(),
    } as unknown as jest.Mocked<QuizService>;

    await TestBed.configureTestingModule({
      imports: [SubjectListComponent],
      providers: [{ provide: QuizService, useValue: quizService }],
    }).compileComponents();

    const mockSubjects: SubjectType[] = [
      { title: 'HTML', icon: 'html-icon', id: '1', questions: [] },
      { title: 'CSS', icon: 'css-icon', id: '2', questions: [] },
    ];

    quizService.getSubjects.mockReturnValue(of(mockSubjects));

    fixture = TestBed.createComponent(SubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch subjects on initialization', () => {
    component.ngOnInit();
    expect(quizService.getSubjects).toHaveBeenCalled();
    expect(component.subjects.length).toBe(2);
    expect(component.subjects[0].title).toBe('HTML');
    expect(component.subjects[1].title).toBe('CSS');
  });

  it('should select a subject', () => {
    const subject: SubjectType = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };
    component.selectSubject(subject);
    expect(quizService.setSubject).toHaveBeenCalledWith(subject);
  });
});
