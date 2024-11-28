import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Quiz, SubjectType } from '../interface/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _url = 'http://localhost:3000/quizzes';
  private selectedSubject$ = new BehaviorSubject<Quiz | null>(null);

  constructor(private http: HttpClient) {
    const savedSubject = localStorage.getItem('selectedSubject');
    if (savedSubject) {
      this.selectedSubject$.next(JSON.parse(savedSubject));
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
    return this.http.get<SubjectType[]>(this._url);
  }

  clearSubject(): void {
    this.selectedSubject$.next(null);
    localStorage.removeItem('selectedSubject');
  }
}
