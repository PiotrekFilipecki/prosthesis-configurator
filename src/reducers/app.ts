import { Actions, type AppAction } from '../actions';
import createReducer from '../shared/lib/createReducer';
import type { AppState, StepId } from '../types/app';

const FIRST_STEP: StepId = 1;
const LAST_STEP: StepId = 5;

const initialState: AppState = {
  step: FIRST_STEP,
  steps: {
    1: {
      id: 1,
      label: 'Side',
      title: 'Side',
      barPercent: 10
    },
    2: {
      id: 2,
      label: 'Type',
      title: 'Type',
      barPercent: 25
    },
    3: {
      id: 3,
      label: 'Personalise',
      title: 'Personalise',
      barPercent: 50
    },
    4: {
      id: 4,
      label: 'Measurement Info',
      title: 'Measurement',
      barPercent: 85
    },
    5: {
      id: 5,
      label: 'Summary',
      title: 'Summary',
      barPercent: 100
    }
  },
  barStep: 1,
  barSteps: {}
};

function getNextStep(step: StepId, offset: number): StepId {
  const nextStep = Math.min(LAST_STEP, Math.max(FIRST_STEP, step + offset));

  return nextStep as StepId;
}

const app = createReducer<AppState, AppAction>(initialState, {
  [Actions.NEXT_STEP](state) {
    return {
      ...state,
      step: getNextStep(state.step, 1)
    };
  },
  [Actions.PREV_STEP](state) {
    return {
      ...state,
      step: getNextStep(state.step, -1)
    };
  }
});

export default app;
