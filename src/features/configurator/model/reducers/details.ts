import { Actions, type AppAction } from '../actions';
import createReducer from '../../../../shared/lib/createReducer';
import {
  measurementFieldIds,
  orderInfoFieldIds,
  type DetailsState,
  type MeasurementsState,
  type OrderInfoState
} from '../../../../types/details';

const initialState: DetailsState = {
  side: null,
  formValid: false,
  measurments: {
    mes_1: {
      label: 'Wrist circumference',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    },
    mes_2: {
      label: 'Forearm circumference',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    },
    mes_3: {
      label: 'Elbow to wrist length',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    },
    mes_4: {
      label: 'Width of the wrist',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    },
    mes_5: {
      label: 'Hand width',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    },
    mes_6: {
      label: 'Elbow to the longest finger tip',
      unit: 'cm',
      value: '',
      valid: false,
      touched: false
    }
  },
  orderInfo: {
    mes_7: {
      label: 'Patient Name and Surname',
      value: '',
      valid: false,
      touched: false
    },
    mes_8: {
      label: 'Technician Name and Surname',
      value: '',
      valid: false,
      touched: false
    },
    mes_9: {
      label: 'Distributor Name',
      value: '',
      valid: false,
      touched: false
    },
    mes_10: {
      label: 'Technician signature',
      value: '',
      valid: false,
      touched: false
    }
  }
};

const details = createReducer<DetailsState, AppAction>(initialState, {
  [Actions.SELECT_SIDE](state, action) {
    return {
      ...state,
      side: action.typ
    };
  },
  [Actions.INPUT_MEASURMENT](state, action) {
    const { id, input } = action.data;
    const nextMeasurements: MeasurementsState = {
      ...state.measurments,
      [id]: {
        ...state.measurments[id],
        value: input,
        touched: true,
        valid: isValidMeasurement(input)
      }
    };

    return {
      ...state,
      measurments: nextMeasurements,
      formValid: getFormValidity(nextMeasurements, state.orderInfo)
    };
  },
  [Actions.INPUT_ORDER_INFO](state, action) {
    const { id, input } = action.data;
    const nextOrderInfo: OrderInfoState = {
      ...state.orderInfo,
      [id]: {
        ...state.orderInfo[id],
        value: input,
        touched: true,
        valid: isRequired(input)
      }
    };

    return {
      ...state,
      orderInfo: nextOrderInfo,
      formValid: getFormValidity(state.measurments, nextOrderInfo)
    };
  },
  [Actions.TOUCH_ALL_FIELDS](state) {
    const nextMeasurements = { ...state.measurments };
    for (const id of measurementFieldIds) {
      nextMeasurements[id] = { ...state.measurments[id], touched: true };
    }

    const nextOrderInfo = { ...state.orderInfo };
    for (const id of orderInfoFieldIds) {
      nextOrderInfo[id] = { ...state.orderInfo[id], touched: true };
    }

    return {
      ...state,
      measurments: nextMeasurements,
      orderInfo: nextOrderInfo
    };
  }
});

function getFormValidity(measurments: MeasurementsState, orderInfo: OrderInfoState): boolean {
  return [...Object.values(measurments), ...Object.values(orderInfo)].every(
    (field) => field.valid
  );
}

const MEASUREMENT_MIN_CM = 0;
const MEASUREMENT_MAX_CM = 200;

function isValidMeasurement(value: string): boolean {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return false;
  }

  const num = Number(normalizedValue);

  if (!Number.isFinite(num)) {
    return false;
  }

  return num >= MEASUREMENT_MIN_CM && num <= MEASUREMENT_MAX_CM;
}

function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export default details;
