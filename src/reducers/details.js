import { Actions } from '../actions/index';
import createReducer from '../helpers/createReducer';

/* ====== */
const initialState = {
  side: null, // L ? R
  formValid: false,
  measurments: {
    mes_1: {
      label: "Wrist circumference",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    },
    mes_2: {
      label: "Forearm circumference",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    },
    mes_3: {
      label: "Elbow to wrist length",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    },
    mes_4: {
      label: "Width of the wrist",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    },
    mes_5: {
      label: "Hand width",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    },
    mes_6: {
      label: "Elbow to the longest finger tip",
      unit: "cm",
      value: '',
      valid: false,
      touched: false,
    }
  },

  orderInfo: {
    mes_7: {
      label: "Patient Name and Surname",
      value: '',
      valid: false,
      touched: false,
    },
    mes_8: {
      label: "Technician Name and Surname",
      value: '',
      valid: false,
      touched: false,
    },
    mes_9: {
      label: "Distributor Name",
      value: '',
      valid: false,
      touched: false,
    },
    mes_10: {
      label: "Technician signature",
      value: '',
      valid: false,
      touched: false,
    }
  }
};

const details = createReducer(initialState, {
  [Actions.SELECT_SIDE](state, action) {
    return {
      ...state,
      side: action.typ
    };
  },
  [Actions.INPUT_MEASURMENT](state, action) {
    const id = action.data.id;
    const value = action.data.input;
    const nextMeasurements = {
      ...state.measurments,
      [id]: {
        ...state.measurments[id],
        value,
        touched: true,
        valid: isValidMeasurement(value)
      }
    };

    return {
      ...state,
      measurments: nextMeasurements,
      formValid: getFormValidity(nextMeasurements, state.orderInfo)
    };
  },
  [Actions.INPUT_ORDER_INFO](state, action) {
    const id = action.data.id;
    const value = action.data.input;
    const nextOrderInfo = {
      ...state.orderInfo,
      [id]: {
        ...state.orderInfo[id],
        value,
        touched: true,
        valid: isRequired(value)
      }
    };

    return {
      ...state,
      orderInfo: nextOrderInfo,
      formValid: getFormValidity(state.measurments, nextOrderInfo)
    };
  }
});

function getFormValidity(measurments, orderInfo) {
  return [...Object.values(measurments), ...Object.values(orderInfo)].every(
    (field) => field.valid
  );
}

function isValidMeasurement(value) {
  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return false;
  }

  return Number.isFinite(Number(normalizedValue));
}

function isRequired(value) {
  return String(value).trim().length > 0;
}

export default details;
