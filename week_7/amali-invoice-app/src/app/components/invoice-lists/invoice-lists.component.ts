import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { EmptyInvoiceComponent } from '../empty-invoice/empty-invoice.component';
import { Store } from '@ngrx/store';
import { selectInvoices } from '../../states/invoice/invoice.reducers';
import { invoiceActions } from '../../states/invoice/invoice.actions';

@Component({
  selector: 'app-invoice-lists',
  standalone: true,
  imports: [HeaderComponent, InvoiceCardComponent, EmptyInvoiceComponent],
  templateUrl: './invoice-lists.component.html',
  styleUrl: './invoice-lists.component.css',
})
export class InvoiceListsComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly invoices = this.store.selectSignal(selectInvoices);

  ngOnInit(): void {
    this.store.dispatch(invoiceActions.getInvoices());
  }
}
