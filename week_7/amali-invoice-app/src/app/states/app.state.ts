import { Invoice } from '../shared/interface/invoice.interface';

export interface AppState {
  invoiceCount: number;
  error: string | null;
  loading: boolean;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  selectedStatuses: string[];
}

export const initialState: AppState = {
  invoiceCount: 0,
  error: null,
  loading: false,
  invoices: [],
  filteredInvoices: [],
  selectedStatuses: [],
};
