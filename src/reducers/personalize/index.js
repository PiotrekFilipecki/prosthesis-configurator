import { Actions } from '../../actions/index';
import createReducer from '../../helpers/createReducer';
import smartArm from './imagesSmartArm'
import sportArm from './imagesSportArm'
import sportForearm from './imagesSportForearm'
import smartForearm from './imagesSmartForearm'
import smartForearmNew from './imagesSmartForearmNew'
/* ====== */

// const SCALE = 0.85;
// const POSITION_Y = 0;
// const POSITION_X = 0;

const initialState = {
  assetsLoaded: false,
  active: undefined,
  hover: undefined,
  colors: {
    black: {
      hex: '#1b1b1b'
    },
    orange: {
      hex: '#ff6421'
    },
    pink: {
      hex: '#eb8a8c'
    },
    white: {
      hex: '#d5d5d5'
    },
    red: {
      hex: '#c64e3c'
    },
    gold: {
      hex: '#d4af37'
    },
    silver: {
      hex: '#8b8b8b'
    },
    blue: {
      hex: '#96c6e9'
    },
    green: {
      hex: '#67a55d'
    },
    violet: {
      hex: '#7a4f92'
    }
  },
  finishing: {
    matt: 'matte',
    shine: 'glossy'
  },
  active_type: 'smart_arm',
  model_names: {
    smart_arm: { name: 'Smart Arm'},
    sport_arm: { name: 'Sport Arm'},
    sport_forearm: { name: 'Sport Forearm'},
    smart_forearm: { name: 'Smart Forearm'},
    smart_forearm_new: { name: 'Smart Forearm NEW'},
  },
  type: {
    smart_arm: {...smartArm },
    sport_arm: {...sportArm },
    sport_forearm: {...sportForearm },
    smart_forearm: {...smartForearm },
    smart_forearm_new: {...smartForearmNew},
  }
}

const personalize = createReducer(initialState, {
  [Actions.ASSETS_LOADED](state, action) {
    return {
      ...state,
      assetsLoaded: true
    }
  },

  [Actions.START_PERSONALIZATION](state, action) {
    const elements = state.type[state.active_type];
    const active = Object.keys(elements)[0];

    return {
      ...state,
      active
    }
  },

  [Actions.RESTART_PERSONALIZATION](state, action) {
    const active = undefined;

    return {
      ...state,
      active
    }
  },

  [Actions.SELECT_TYPE](state, action) {
    return {
      ...state,
      active_type: action.typ
    }
  },

  [Actions.SELECT_COLOR](state, action) {
    const elements = state.type[state.active_type];
    elements[state.active].selectedColor = action.color;
    return {
      ...state,
      elements
    }
  },

  [Actions.SELECT_FINISHING](state, action) {
    const elements = state.type[state.active_type];
    elements[state.active].selectedFinishing = action.finishing;
    return {
      ...state,
      elements
    }
  },

  [Actions.MOUSE_OVER_PART](state, action) {
    return {
      ...state,
      hover: action.id
    }
  },

  [Actions.MOUSE_OUT_PART](state, action) {
    return {
      ...state,
      hover: null
    }
  },

  [Actions.SELECT_PART](state, action) {
    let {active} = state;
    active = action.id;
    // use mapID
    // elements[mapID[action.id]].selectedFinishing = action.finishing;
    return {
      ...state,
      active
    }
  }
});

export default personalize;
