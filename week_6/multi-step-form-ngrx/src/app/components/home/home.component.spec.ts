import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteMock {
  snapshot = { paramMap: new Map() };
  queryParams = of({});
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
