import { Actions } from '../actions';
import app from './app';
import details from './details';
import personalize from './personalize';
import { measurementFieldIds, orderInfoFieldIds } from '../types/details';

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

    measurementFieldIds.forEach((id) => {
      state = details(state, {
        type: Actions.INPUT_MEASURMENT,
        data: { id, input: '10' }
      });
    });

    expect(state.formValid).toBe(false);

    orderInfoFieldIds.forEach((id) => {
      state = details(state, {
        type: Actions.INPUT_ORDER_INFO,
        data: { id, input: 'filled' }
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

    expect(activeKey).not.toBeNull();
    if (!activeKey) {
      throw new Error('Expected an active part after personalization start.');
    }

    const colorElement = colorState.type[colorState.active_type][activeKey];
    const finishingElement = finishingState.type[finishingState.active_type][activeKey];
    const initialElement = activeState.type[activeState.active_type][activeKey];

    if (!colorElement || !finishingElement || !initialElement) {
      throw new Error('Expected selected elements to exist for the active part.');
    }

    expect(colorState.type).not.toBe(activeState.type);
    expect(colorElement.selectedColor).toBe('black');
    expect(finishingElement.selectedFinishing).toBe('glossy');
    expect(initialElement.selectedColor).not.toBe('black');
  });
});
