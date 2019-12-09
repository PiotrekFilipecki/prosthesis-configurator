export const Actions = {
  SELECT_COLOR: 'SELECT_COLOR',
  SELECT_FINISHING: 'SELECT_FINISHING',
  SELECT_PART: 'SELECT_PART',
  // SELECT_SIDE: 'SELECT_SIDE',
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
  RESTART_PERSONALIZATION: 'RESTART_PERSONALIZATION',

}
// export const
// export const SELECT_FINISHING = 'SELECT_FINISHING';

export const selectColor = (color) => ({
  type: Actions.SELECT_COLOR,
  color
});

export const selectFinishing = (finishing) => ({
  type: Actions.SELECT_FINISHING,
  finishing
});

export const selectPart = (id) => ({
  type: Actions.SELECT_PART,
  id
});

export const onMouseOver = (id) => ({
  type: Actions.MOUSE_OVER_PART,
  id
});

export const onMouseOut = () => ({
  type: Actions.MOUSE_OUT_PART,
});

export const assetsLoaded = () => ({
  type: Actions.ASSETS_LOADED
});


export const nextStep = () => ({
  type: Actions.NEXT_STEP
});

export const nextBarStep = () => ({
  type: Actions.NEXT_BAR_STEP
});

export const prevStep = () => ({
  type: Actions.PREV_STEP
});

export const prevBarStep = () => ({
  type: Actions.PREV_BAR_STEP
});


export const selectType = (typ) => ({
  type: Actions.SELECT_TYPE,
  typ
});

export const selectSide = (typ) => ({
  type: Actions.SELECT_SIDE,
  typ
});

export const onInputMeasurment = (data) => ({
  type: Actions.INPUT_MEASURMENT,
  data
});

export const onInputOrderInfo = (data) => ({
  type: Actions.INPUT_ORDER_INFO,
  data
});

export const startPersonalization = () => ({
  type: Actions.START_PERSONALIZATION,
});
export const restartPersonalization = () => ({
  type: Actions.RESTART_PERSONALIZATION,
});

