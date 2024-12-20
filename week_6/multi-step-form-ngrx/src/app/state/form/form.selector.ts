import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.state';

export const selectForm = createFeatureSelector<FormState>('form');

export const selectCurrentStep = createSelector(
  selectForm,
  (state: FormState) => state.currentStep
);

export const selectFormFields = createSelector(
  selectForm,
  (state: FormState) => state.formFields
);

export const selectIsDone = createSelector(
  selectForm,
  (state: FormState) => state.isDone
);

export const selectIsYearly = createSelector(
  selectForm,
  (state: FormState) => state.isYearly
);

export const selectFormState = createSelector(
  selectForm,
  (state: FormState) => state
);

export const selectIsForward = createSelector(
  selectForm,
  (state: FormState) => state.isForward
);
