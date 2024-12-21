import { Component, inject, Input } from '@angular/core';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectInvoiceCount,
  selectSelectedStatuses,
} from '../../states/invoice/invoice.reducers';
import { FilterComponent } from '../filter/filter.component';

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
  private readonly selectedStatus = this.store.selectSignal(
    selectSelectedStatuses
  );

  public readonly error = this.store.selectSignal(selectError);

  public newInvoice() {
    alert('Slide in new invoice form');
  }

  get invoiceLabel(): string {
    const selectedStatuses = this.selectedStatus()?.length || 0;

    if (this.invoiceCount() === 0) {
      return 'No invoices';
    }

    if (selectedStatuses === 1) {
      return `There are ${this.invoiceCount()} ${this.selectedStatus()} invoices`;
    }

    return `There are ${this.invoiceCount()} total invoices`;
  }
}
