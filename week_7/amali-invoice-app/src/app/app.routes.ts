import { Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListsComponent } from './components/invoice-lists/invoice-lists.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'invoices',
  },
  {
    path: 'invoices',
    component: InvoiceListsComponent,
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent,
  },
];
