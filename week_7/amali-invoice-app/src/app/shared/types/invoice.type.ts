export type InvoiceStatus = 'pending' | 'draft' | 'paid';

export type invoiceItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type ClientInterface = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};
export type SenderInterface = Pick<
  ClientInterface,
  'country' | 'postCode' | 'street' | 'city'
>;
