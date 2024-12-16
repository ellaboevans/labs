import { FormPayload } from "../../interface/form-payload";

export interface FormState {
  currentStep: number;
  isForward: boolean;
  isDone: boolean;
  isYearly: boolean;
  formFields: FormPayload;
}

export const initialState: FormState = {
  currentStep: 1,
  isForward: false,
  isDone: false,
  isYearly: false,
  formFields: {
    name: '',
    email: '',
    phone: '',
    plan: {
      type: '',
      price: '',
    },
    addons: [],
  },
};