import { Actions } from '../actions/index';
import createReducer from '../helpers/createReducer';

/* ====== */
const initialState = {
  step: 1,
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

const app = createReducer(initialState, {
  [Actions.NEXT_STEP](state, action) {
    return {
      ...state,
      step: ++state.step
    }
  },
  [Actions.PREV_STEP](state, action) {
    return {
      ...state,
      step: --state.step
    }
  },
});

export default app;
