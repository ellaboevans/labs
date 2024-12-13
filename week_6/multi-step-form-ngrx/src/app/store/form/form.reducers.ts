import { createFeature, createReducer, on } from '@ngrx/store';
import { formActions } from './form.actions';
import { FormPayload } from '../../interface/form-payload';

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
const formFeature = createFeature({
  name: 'form',
  reducer: createReducer(
    initialState,
    on(formActions.submitForm, (state, { payload }) => ({
      ...state,
      formFields: payload,
      isDone: true,
    })),
    on(formActions.goToNextStep, (state) => ({
      ...state,
      currentStep: state.currentStep + 1,
      isForward: true,
    })),
    on(formActions.goToPreviousStep, (state) => ({
      ...state,
      currentStep: state.currentStep - 1,
      isForward: false,
    })),
    on(formActions.setCurrentStep, (state, { step }) => ({
      ...state,
      currentStep: step,
    })),
    on(formActions.resetForm, () => initialState),
    on(formActions.setIsDone, (state, { data }) => ({
      ...state,
      isDone: data,
    })),
    on(formActions.setIsYearly, (state, { data }) => ({
      ...state,
      isYearly: data,
    }))
  ),
});

export const {
  name: formFeatureKey,
  reducer: formReducer,
  selectCurrentStep,
  selectFormFields,
  selectIsDone,
  selectIsYearly,
  selectFormState,
  selectIsForward,
} = formFeature;
