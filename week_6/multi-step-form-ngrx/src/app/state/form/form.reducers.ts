import { createFeature, createReducer, on } from '@ngrx/store';
import { formActions } from './form.actions';
import { initialState } from './form.state';

const formFeature = createFeature({
  name: 'form',
  reducer: createReducer(
    initialState,
    on(formActions.submitForm, (state, { payload }) => ({
      ...state,
      formFields: payload,
      isDone: true,
    })),
    on(formActions.goToNextStep, (state, { stepPayload }) => ({
      ...state,
      currentStep: state.currentStep + 1,
      isForward: true,
      formFields: { ...state.formFields, ...stepPayload },
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

export const { name: formFeatureKey, reducer: formReducer } = formFeature;
