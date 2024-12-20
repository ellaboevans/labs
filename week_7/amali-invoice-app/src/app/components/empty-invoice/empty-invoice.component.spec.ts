import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyInvoiceComponent } from './empty-invoice.component';

describe('EmptyInvoiceComponent', () => {
  let component: EmptyInvoiceComponent;
  let fixture: ComponentFixture<EmptyInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
