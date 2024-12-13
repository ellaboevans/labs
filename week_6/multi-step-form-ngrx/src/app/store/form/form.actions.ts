import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FormPayload } from '../../interface/form-payload';

export const formActions = createActionGroup({
  source: 'form',
  events: {
    'Set current step': props<{ step: number }>(),
    'Go to next step': emptyProps(),
    'Go to previous step': emptyProps(),
    'Submit form': props<{ payload: FormPayload }>(),
    'Reset form': emptyProps(),
    'Set is Done': props<{ data: boolean }>(),
    'Set is Yearly': props<{ data: boolean }>(),
  },
});
