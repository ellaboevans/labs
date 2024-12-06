import { Addon, Plan } from './addon';

export interface Summary {
  email: string;
  name: string;
  phone: string;
  plan?: Plan;
  addons?: Addon[];
}

// interface Addon {
//   description: string;
//   price: string;
//   title: string;
//   type: string;
// }

// interface Plan {
//   type: string;
//   price: string;
//   extras: string;
// }
