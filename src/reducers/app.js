import { Actions } from '../actions/index';
import createReducer from '../helpers/createReducer';

/* ====== */
const FIRST_STEP = 1;

const initialState = {
  step: FIRST_STEP,
  steps: {
    1: {
      id: 1,
      label: "Side",
      title: "Side",
      barPercent: 10
    },
    2: {
      id: 2,
      label: "Type",
      title: "Type",
      barPercent:25
    },
    3: {
      id: 3,
      label: "Personalise",
      title: "Personalise",
      barPercent:50
    },
    4: {
      id: 4,
      label: "Measurement Info",
      title: "Measurement",
      barPercent: 85
    },
    5: {
      id: 5,
      label: "Summary",
      title: "Summary",
      barPercent:100
    },
    // 5: {
    //   id: 5,
    //   label: "05 Step 5",
    // },
    // 6: {
    //   id: 6,
    //   label: "06 Step 6",
    // },
    // 1: {
    //   id: 1,
    //   label: "01 Step 1",
    // },
    // 2: {
    //   id: 2,
    //   label: "02 Step 2",
    // },
    // 3: {
    //   id: 3,
    //   label: "03 Step 3",
    // },
    // 4: {
    //   id: 4,
    //   label: "04 Step 4",
    // },
    // 5: {
    //   id: 5,
    //   label: "05 Step 5",
    // },
    // 6: {
    //   id: 6,
    //   label: "06 Step 6",
    // },
  },
  barStep:1,
  barSteps: {

  }
};

const LAST_STEP = Object.keys(initialState.steps).length;

function getNextStep(step, offset) {
  return Math.min(LAST_STEP, Math.max(FIRST_STEP, step + offset));
}

const app = createReducer(initialState, {
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
