import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListsComponent } from './invoice-lists.component';

describe('InvoiceListsComponent', () => {
  let component: InvoiceListsComponent;
  let fixture: ComponentFixture<InvoiceListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
