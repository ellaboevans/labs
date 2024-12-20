import { Component, inject, Input } from '@angular/core';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectInvoiceCount,
} from '../../states/invoice/invoice.reducers';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeadlineComponent, ButtonComponent, FilterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() public readonly buttonIcon = '/assets/icon-plus.svg';

  private readonly store = inject(Store);

  public readonly invoiceCount = this.store.selectSignal(selectInvoiceCount);

  public readonly error = this.store.selectSignal(selectError);

  public newInvoice() {
    console.log('New Invoice');
    console.log(this.error());
  }

  get invoiceLabel(): string {
    return this.invoiceCount() > 0
      ? `There are ${this.invoiceCount()} invoices`
      : 'No invoices';
  }
}
