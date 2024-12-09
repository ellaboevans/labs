import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let quizservice: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    quizservice = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(quizservice).toBeTruthy();
  });
});
