import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Quiz, SubjectType } from '../interface/quiz';
import QuizzesData from '../../../public/assets/data/data.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private selectedSubject$ = new BehaviorSubject<Quiz | null>(null);

  constructor() {
    const savedSubject = localStorage.getItem('selectedSubject');
    if (savedSubject) {
      try {
        const parsedSubject = JSON.parse(savedSubject);
        this.selectedSubject$.next(parsedSubject);
      } catch (error) {
        console.error(
          'Error parsing selectedSubject from local storage',
          error
        );
        localStorage.removeItem('selectedSubject');
      }
    }
  }

  setSubject(subject: Quiz): void {
    this.selectedSubject$.next(subject);
    localStorage.setItem('selectedSubject', JSON.stringify(subject));
  }

  getSelectedSubject(): Observable<Quiz | null> {
    return this.selectedSubject$.asObservable();
  }

  getSubjects(): Observable<SubjectType[]> {
    return new BehaviorSubject(
      QuizzesData.quizzes as SubjectType[]
    ).asObservable();
  }

  clearSubject(): void {
    this.selectedSubject$.next(null);
    localStorage.removeItem('selectedSubject');
  }
}
