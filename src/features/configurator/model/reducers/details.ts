import { Actions, type AppAction } from '../actions';
import createReducer from '../../../../shared/lib/createReducer';
import type {
  DetailsState,
  MeasurementsState,
  OrderInfoState
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
  }
});

function getFormValidity(measurments: MeasurementsState, orderInfo: OrderInfoState): boolean {
  return [...Object.values(measurments), ...Object.values(orderInfo)].every(
    (field) => field.valid
  );
}

function isValidMeasurement(value: string): boolean {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return false;
  }

  return Number.isFinite(Number(normalizedValue));
}

function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export default details;
