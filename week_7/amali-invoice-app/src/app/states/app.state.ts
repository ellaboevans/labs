import { Invoice } from '../shared/interface/invoice.interface';

export interface AppState {
  invoiceCount: number;
  error: string | null;
  loading: boolean;
  selectedInvoice: Invoice | null;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  selectedStatuses: string[];
}

export const initialState: AppState = {
  invoiceCount: 0,
  error: null,
  loading: false,
  invoices: [],
  selectedInvoice: null,
  filteredInvoices: [],
  selectedStatuses: [],
};
