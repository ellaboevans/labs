import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteMock {
  snapshot = { paramMap: new Map() };
  queryParams = of({});
}

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
