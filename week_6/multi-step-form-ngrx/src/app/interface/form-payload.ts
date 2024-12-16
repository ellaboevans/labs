import { Addon, Plan } from './addon';

export interface FormPayload {
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  addons: Addon[];
}

export type StepPayload = Partial<FormPayload>;


