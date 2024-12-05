export interface Addon {
  type: string;
  title: string;
  description: string;
  price: string;
}

export type Plan = Pick<Addon, 'type' | 'price'>;
