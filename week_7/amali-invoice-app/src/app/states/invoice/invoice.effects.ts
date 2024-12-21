import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { map, switchMap, catchError, of } from 'rxjs';
import { invoiceActions } from './invoice.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InvoiceEffects {
  private readonly actions$ = inject(Actions);
  private readonly invoiceService = inject(InvoiceService);

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.getInvoices),
      switchMap(() =>
        this.invoiceService.getInvoices().pipe(
          map((invoices) => invoiceActions.getInvoicesSuccess({ invoices })),
          catchError((error: HttpErrorResponse) =>
            of(invoiceActions.getInvoicesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.getInvoice),
      switchMap((action) =>
        this.invoiceService.getInvoice(action.id).pipe(
          map((invoice) => invoiceActions.getInvoiceSuccess({ invoice })),
          catchError((error: HttpErrorResponse) =>
            of(invoiceActions.getInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
