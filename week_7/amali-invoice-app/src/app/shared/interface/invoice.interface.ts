import {
  ClientInterface,
  invoiceItem,
  InvoiceStatus,
  SenderInterface,
} from '../types/invoice.type';

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  clientEmail: string;
  clientName: string;
  description: string;
  status: InvoiceStatus;
  paymentTerms: number;
  items: invoiceItem[];
  clientAddress: ClientInterface;
  senderAddress: SenderInterface;
  total: number;
}
