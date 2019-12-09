import {Actions} from '../actions/index';
import createReducer from '../helpers/createReducer';
import { isNumber } from 'util';

/* ====== */
const initialState = {
  side: null, // L ? R
  formValid: false,
  measurments: {
    mes_1: {
      label: "Wrist circumference",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    },
    mes_2: {
      label: "Forearm circumference",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    },
    mes_3: {
      label: "Elbow to wrist length",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    },
    mes_4: {
      label: "Width of the wrist",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    },
    mes_5: {
      label: "Hand width",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    },
    mes_6: {
      label: "Elbow to the longest finger tip",
      unit: "cm",
      value: 0,
      valid: false,
      touched: false,
    }
  },

  orderInfo: {
    mes_7: {
      label: "Patient Name and Surname",
      value: '',
      valid: true,
      touched: false,
    },
    mes_8: {
      label: "Technician Name and Surname",
      value: '',
      valid: true,
      touched: false,
    },
    mes_9: {
      label: "Distributor Name",
      value: '',
      valid: true,
      touched: false,
    },
    mes_10: {
      label: "Technician signature",
      value: '',
      valid: true,
      touched: false,
    }
  }
};

const details = createReducer(initialState, {
  [Actions.SELECT_SIDE](state, action) {
    return {
      ...state,
      side: action.typ
    }
  },
  [Actions.INPUT_MEASURMENT](state, action) {
    let formValid = true;
    const {measurments} = state;
    const id = action.data.id;

    measurments[id].value = action.data.input;
    measurments[id].touched = true;

    // validation
    if (isValid(measurments[id].value)) {
      measurments[id].valid = false;
    }
    else {
      measurments[id].valid = true;
    }

    for (let field in measurments) {
      if (measurments[field].valid === false) {
        formValid = false;
      }
    }

    return {
      ...state,
      formValid,
      measurments
    }
  },
  [Actions.INPUT_ORDER_INFO](state, action) {
    let formValid = true;
    const {orderInfo} = state;
    const id = action.data.id;

    orderInfo[id].value = action.data.input;
    orderInfo[id].touched = true;

    // validation
    if (isRequired(orderInfo[id].value)) {
      orderInfo[id].valid = false;
    }
    else {
      orderInfo[id].valid = true;
    }

    for (let field in orderInfo) {
      if (orderInfo[field].valid === false) {
        formValid = false;
      }
    }

    return {
      ...state,
      orderInfo
    }
  }
});

function isValid(value) {
  if (value.length > 0 && isNumber(+value) && isNaN(+value) ) {
    return true;
  }

  return false;
}

function isRequired(value) {
  if (value.trim().length > 0) {
    return true;
  }

  return false;
}

export default details;
