import { Component, inject, Input } from '@angular/core';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { Invoice } from '../../shared/interface/invoice.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [BadgeComponent, CommonModule],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.css',
})
export class InvoiceCardComponent {
  @Input() public invoice!: Invoice;
  private readonly router = inject(Router);

  public navigateToInvoice(id: string): void {
    this.router.navigateByUrl(`/invoices/${id}`);
  }
}
