import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../../states/invoice/invoice.actions';
import { selectSelectedInvoice } from '../../states/invoice/invoice.reducers';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Location } from '@angular/common';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit {
  public invoiceId: string = '';
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  private readonly store = inject(Store);
  public readonly buttonIcon = '/assets/icon-arrow-left.svg';
  public readonly invoice = this.store.selectSignal(selectSelectedInvoice);

  ngOnInit(): void {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(invoiceActions.getInvoice({ id: this.invoiceId }));
  }

  public goBack(): void {
    this.location.back();
  }

  public updateInvoice(): void {
    alert(`Update Invoice ${this.invoiceId}`);
  }

  public deleteInvoice(): void {
    alert(`Delete Invoice ${this.invoiceId}`);
  }

  public markInvoiceAsPaid(): void {
    alert(`Mark Invoice ${this.invoiceId} as Paid`);
  }

  public get disableButton(): boolean {
    return this.invoice() ? this.invoice()?.status === 'draft' : false;
  }
}
