import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invoice } from '../../shared/interface/invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  constructor() {}

  public getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/invoices`);
  }

  public getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/invoices/${id}`);
  }
}
