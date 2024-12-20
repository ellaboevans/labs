import { Addon, Plan } from './addon';

export interface Summary {
  email: string;
  name: string;
  phone: string;
  plan?: Plan;
  addons?: Addon[];
}
