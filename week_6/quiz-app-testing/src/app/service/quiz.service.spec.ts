import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { Quiz, SubjectType } from '../interface/quiz';

describe('QuizService', () => {
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    quizService = TestBed.inject(QuizService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(quizService).toBeTruthy();
  });

  it('should set and get the selected subject', () => {
    const mockSubject: Quiz = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };
    quizService.setSubject(mockSubject);
    quizService.getSelectedSubject().subscribe((subject) => {
      expect(subject).toEqual(mockSubject);
    });
    expect(localStorage.getItem('selectedSubject')).toEqual(
      JSON.stringify(mockSubject)
    );
  });

  it('should retrieve subjects', (done) => {
    quizService.getSubjects().subscribe((subjects: SubjectType[]) => {
      expect(subjects.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should clear the selected subject', () => {
    const mockSubject: Quiz = {
      id: '1',
      title: 'HTML',
      icon: 'html-icon',
      questions: [],
    };
    quizService.setSubject(mockSubject);
    quizService.clearSubject();
    quizService.getSelectedSubject().subscribe((subject) => {
      expect(subject).toBeNull();
    });
    expect(localStorage.getItem('selectedSubject')).toBeNull();
  });
});
