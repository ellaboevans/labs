import { Component, inject, signal } from '@angular/core';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../../states/invoice/invoice.actions';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [HeadlineComponent, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  public isOpen = signal(false);
  private readonly store = inject(Store);
  public readonly statuses: string[] = ['draft', 'pending', 'paid'];

  public toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  public onStatusChange(status: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.store.dispatch(invoiceActions.setInvoiceStatusFilter({ status }));
    } else {
      this.store.dispatch(invoiceActions.clearInvoiceFilter({ status }));
    }
  }

  public isStatusSelected(status: string): boolean {
    const selectedStatuses = this.store.selectSignal(
      (state) => state.invoice.selectedStatuses
    );
    return selectedStatuses().includes(status);
  }
}
