import { createFeature, createReducer, on } from '@ngrx/store';
import { invoiceActions } from './invoice.actions';
import { initialState } from '../app.state';

const invoiceFeature = createFeature({
  name: 'invoice',
  reducer: createReducer(
    initialState,
    on(invoiceActions.setInvoiceCount, (state, { count }) => ({
      ...state,
      invoiceCount: count,
    })),

    on(invoiceActions.getInvoices, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(invoiceActions.getInvoicesSuccess, (state, { invoices }) => ({
      ...state,
      invoices,
      filteredInvoices: invoices,
      loading: false,
      error: null,
    })),
    on(invoiceActions.getInvoicesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(invoiceActions.getInvoice, (state, action) => ({
      ...state,
      invoices: state.invoices.map((invoice) =>
        invoice.id === action.id ? { ...invoice, id: action.id } : invoice
      ),
    })),
    on(invoiceActions.updateInvoice, (state, { invoice }) => ({
      ...state,
      invoices: state.invoices.map((existingInvoice) =>
        existingInvoice.id === invoice.id ? invoice : existingInvoice
      ),
    })),
    on(invoiceActions.deleteInvoice, (state, { id }) => ({
      ...state,
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
    on(invoiceActions.createInvoice, (state, { invoice }) => ({
      ...state,
      invoices: [...state.invoices, invoice],
    })),
    on(invoiceActions.setInvoiceStatusFilter, (state, { status }) => {
      const filteredInvoices = status
        ? state.invoices.filter((invoice) => invoice.status === status)
        : state.invoices;
      return {
        ...state,
        selectedStatus: status,
        filteredInvoices,
        invoiceCount: filteredInvoices.length,
      };
    }),
    on(invoiceActions.clearInvoiceFilter, (state) => {
      return {
        ...state,
        selectedStatus: '',
        filteredInvoices: state.invoices,
        invoiceCount: state.invoices.length,
      };
    })
  ),
});

export const {
  name: invoiceReducerName,
  reducer: invoiceReducer,
  selectInvoiceCount,
  selectInvoices,
  selectInvoiceState,
  selectError,
  selectSelectedStatus,
  selectFilteredInvoices,
} = invoiceFeature;