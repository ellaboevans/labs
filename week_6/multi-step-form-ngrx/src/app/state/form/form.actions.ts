import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FormPayload, StepPayload } from '../../interface/form-payload';

export const formActions = createActionGroup({
  source: 'form',
  events: {
    'Set current step': props<{ step: number }>(),
    'Go to next step': props<{ stepPayload: StepPayload }>(),
    'Go to previous step': emptyProps(),
    'Submit form': props<{ payload: FormPayload }>(),
    'Reset form': emptyProps(),
    'Set is Done': props<{ data: boolean }>(),
    'Set is Yearly': props<{ data: boolean }>(),
  },
});
