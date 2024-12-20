import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  invoiceReducer,
  invoiceReducerName,
} from './states/invoice/invoice.reducers';
import { provideEffects } from '@ngrx/effects';
import { InvoiceEffects } from './states/invoice/invoice.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(invoiceReducerName, invoiceReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 25,
      connectInZone: true,
    }),
    provideEffects(InvoiceEffects),
  ],
};
