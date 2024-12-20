import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Invoice } from '../../shared/interface/invoice.interface';

export const invoiceActions = createActionGroup({
  source: 'Invoice',
  events: {
    'Set Invoice Count': props<{ count: number }>(),
    'Get Invoices': emptyProps(),
    'Get Invoices Success': props<{ invoices: Invoice[] }>(),
    'Get Invoices Failure': props<{ error: string }>(),
    'Get Invoice': props<{ id: string }>(),
    'Update Invoice': props<{ invoice: Invoice }>(),
    'Delete Invoice': props<{ id: string }>(),
    'Create Invoice': props<{ invoice: Invoice }>(),
    'Set Invoice Status Filter': props<{ status: string }>(),
    'Clear Invoice Filter': emptyProps(),
  },
});
