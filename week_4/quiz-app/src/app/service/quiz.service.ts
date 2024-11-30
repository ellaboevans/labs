import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quiz, SubjectType } from '../interface/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _url = 'assets/data/data.json';
  private selectedSubject$ = new BehaviorSubject<Quiz | null>(null);

  constructor(private http: HttpClient) {
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
    return this.http
      .get<{ quizzes: Quiz[] }>(`${this._url}`)
      .pipe(map((data) => data.quizzes))
      .pipe(catchError(this.handleError));
  }

  clearSubject(): void {
    this.selectedSubject$.next(null);
    localStorage.removeItem('selectedSubject');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
