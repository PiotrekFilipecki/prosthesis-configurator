import app from './app';
import details from './details';
import personalize from './personalize';
import { Actions } from '../actions';

describe('app reducer', () => {
  it('clamps wizard step boundaries', () => {
    const initialState = app(undefined, { type: '@@INIT' });
    const previousState = app(initialState, { type: Actions.PREV_STEP });
    let nextState = initialState;

    for (let index = 0; index < 10; index += 1) {
      nextState = app(nextState, { type: Actions.NEXT_STEP });
    }

    expect(previousState.step).toBe(1);
    expect(nextState.step).toBe(5);
  });
});

describe('details reducer', () => {
  it('updates measurement immutably and validates numeric input', () => {
    const initialState = details(undefined, { type: '@@INIT' });
    const nextState = details(initialState, {
      type: Actions.INPUT_MEASURMENT,
      data: { id: 'mes_1', input: '12.5' }
    });

    expect(nextState).not.toBe(initialState);
    expect(nextState.measurments).not.toBe(initialState.measurments);
    expect(nextState.measurments.mes_1.value).toBe('12.5');
    expect(nextState.measurments.mes_1.valid).toBe(true);
    expect(initialState.measurments.mes_1.value).toBe('');
  });

  it('requires order information before form becomes valid', () => {
    let state = details(undefined, { type: '@@INIT' });

    Object.keys(state.measurments).forEach((key) => {
      state = details(state, {
        type: Actions.INPUT_MEASURMENT,
        data: { id: key, input: '10' }
      });
    });

    expect(state.formValid).toBe(false);

    Object.keys(state.orderInfo).forEach((key) => {
      state = details(state, {
        type: Actions.INPUT_ORDER_INFO,
        data: { id: key, input: 'filled' }
      });
    });

    expect(state.formValid).toBe(true);
  });
});

describe('personalize reducer', () => {
  it('updates selected part settings immutably', () => {
    const initializedState = personalize(undefined, { type: '@@INIT' });
    const activeState = personalize(initializedState, {
      type: Actions.START_PERSONALIZATION
    });
    const colorState = personalize(activeState, {
      type: Actions.SELECT_COLOR,
      color: 'black'
    });
    const finishingState = personalize(colorState, {
      type: Actions.SELECT_FINISHING,
      finishing: 'glossy'
    });
    const activeKey = activeState.active;

    expect(colorState.type).not.toBe(activeState.type);
    expect(
      colorState.type[colorState.active_type][activeKey].selectedColor
    ).toBe('black');
    expect(
      finishingState.type[finishingState.active_type][activeKey].selectedFinishing
    ).toBe('glossy');
    expect(
      activeState.type[activeState.active_type][activeKey].selectedColor
    ).not.toBe('black');
  });
});
