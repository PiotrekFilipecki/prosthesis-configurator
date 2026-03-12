import {
  Actions,
  selectColor,
  selectFinishing,
  selectPart,
  nextStep,
  prevStep,
  selectType,
  selectSide,
  onInputMeasurment,
  onInputOrderInfo,
  startPersonalization,
  restartPersonalization,
  assetsLoaded
} from './actions';

describe('action creators', () => {
  it('selectColor returns correct action', () => {
    const action = selectColor('black');
    expect(action).toEqual({ type: Actions.SELECT_COLOR, color: 'black' });
  });

  it('selectFinishing returns correct action', () => {
    const action = selectFinishing('glossy');
    expect(action).toEqual({ type: Actions.SELECT_FINISHING, finishing: 'glossy' });
  });

  it('selectPart returns correct action', () => {
    const action = selectPart('part-1');
    expect(action).toEqual({ type: Actions.SELECT_PART, id: 'part-1' });
  });

  it('nextStep returns correct action', () => {
    expect(nextStep()).toEqual({ type: Actions.NEXT_STEP });
  });

  it('prevStep returns correct action', () => {
    expect(prevStep()).toEqual({ type: Actions.PREV_STEP });
  });

  it('selectType returns correct action', () => {
    const action = selectType('smart_arm');
    expect(action).toEqual({ type: Actions.SELECT_TYPE, typ: 'smart_arm' });
  });

  it('selectSide returns correct action', () => {
    const action = selectSide('left');
    expect(action).toEqual({ type: Actions.SELECT_SIDE, typ: 'left' });
  });

  it('onInputMeasurment returns correct action', () => {
    const action = onInputMeasurment({ id: 'mes_1', input: '10' });
    expect(action).toEqual({
      type: Actions.INPUT_MEASURMENT,
      data: { id: 'mes_1', input: '10' }
    });
  });

  it('onInputOrderInfo returns correct action', () => {
    const action = onInputOrderInfo({ id: 'mes_7', input: 'John' });
    expect(action).toEqual({
      type: Actions.INPUT_ORDER_INFO,
      data: { id: 'mes_7', input: 'John' }
    });
  });

  it('startPersonalization returns correct action', () => {
    expect(startPersonalization()).toEqual({ type: Actions.START_PERSONALIZATION });
  });

  it('restartPersonalization returns correct action', () => {
    expect(restartPersonalization()).toEqual({ type: Actions.RESTART_PERSONALIZATION });
  });

  it('assetsLoaded returns correct action', () => {
    expect(assetsLoaded()).toEqual({ type: Actions.ASSETS_LOADED });
  });
});
