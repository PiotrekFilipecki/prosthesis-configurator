import type {
  MeasurementFieldId,
  OrderInfoFieldId,
  Side
} from '../types/details';
import type {
  ColorId,
  FinishingValue,
  ProsthesisType
} from '../types/personalize';

export const Actions = {
  SELECT_COLOR: 'SELECT_COLOR',
  SELECT_FINISHING: 'SELECT_FINISHING',
  SELECT_PART: 'SELECT_PART',
  MOUSE_OVER_PART: 'MOUSE_OVER_PART',
  MOUSE_OUT_PART: 'MOUSE_OUT_PART',
  ASSETS_LOADED: 'ASSETS_LOADED',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  NEXT_BAR_STEP: 'NEXT_BAR_STEP',
  PREV_BAR_STEP: 'PREV_BAR_STEP',
  SELECT_TYPE: 'SELECT_TYPE',
  SELECT_SIDE: 'SELECT_SIDE',
  INPUT_MEASURMENT: 'INPUT_MEASURMENT',
  INPUT_ORDER_INFO: 'INPUT_ORDER_INFO',
  START_PERSONALIZATION: 'START_PERSONALIZATION',
  RESTART_PERSONALIZATION: 'RESTART_PERSONALIZATION'
} as const;

export interface MeasurementInputPayload {
  id: MeasurementFieldId;
  input: string;
}

export interface OrderInfoInputPayload {
  id: OrderInfoFieldId;
  input: string;
}

export const selectColor = (color: ColorId) =>
  ({
    type: Actions.SELECT_COLOR,
    color
  } as const);

export const selectFinishing = (finishing: FinishingValue) =>
  ({
    type: Actions.SELECT_FINISHING,
    finishing
  } as const);

export const selectPart = (id: string) =>
  ({
    type: Actions.SELECT_PART,
    id
  } as const);

export const onMouseOver = (id: number) =>
  ({
    type: Actions.MOUSE_OVER_PART,
    id
  } as const);

export const onMouseOut = () =>
  ({
    type: Actions.MOUSE_OUT_PART
  } as const);

export const assetsLoaded = () =>
  ({
    type: Actions.ASSETS_LOADED
  } as const);

export const nextStep = () =>
  ({
    type: Actions.NEXT_STEP
  } as const);

export const nextBarStep = () =>
  ({
    type: Actions.NEXT_BAR_STEP
  } as const);

export const prevStep = () =>
  ({
    type: Actions.PREV_STEP
  } as const);

export const prevBarStep = () =>
  ({
    type: Actions.PREV_BAR_STEP
  } as const);

export const selectType = (typ: ProsthesisType) =>
  ({
    type: Actions.SELECT_TYPE,
    typ
  } as const);

export const selectSide = (typ: Side) =>
  ({
    type: Actions.SELECT_SIDE,
    typ
  } as const);

export const onInputMeasurment = (data: MeasurementInputPayload) =>
  ({
    type: Actions.INPUT_MEASURMENT,
    data
  } as const);

export const onInputOrderInfo = (data: OrderInfoInputPayload) =>
  ({
    type: Actions.INPUT_ORDER_INFO,
    data
  } as const);

export const startPersonalization = () =>
  ({
    type: Actions.START_PERSONALIZATION
  } as const);

export const restartPersonalization = () =>
  ({
    type: Actions.RESTART_PERSONALIZATION
  } as const);

const actionCreators = {
  selectColor,
  selectFinishing,
  selectPart,
  onMouseOver,
  onMouseOut,
  assetsLoaded,
  nextStep,
  nextBarStep,
  prevStep,
  prevBarStep,
  selectType,
  selectSide,
  onInputMeasurment,
  onInputOrderInfo,
  startPersonalization,
  restartPersonalization
};

export type AppAction = ReturnType<(typeof actionCreators)[keyof typeof actionCreators]>;
