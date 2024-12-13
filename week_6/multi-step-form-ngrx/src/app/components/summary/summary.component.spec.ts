import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have totalPrice property with @Input()', () => {
    component.totalPrice = '100';
    expect(component.totalPrice).toBe(String(100));
  });

  it('should have isYearly property with @Input()', () => {
    expect(component.isYearly).toBeDefined();
  });
});
