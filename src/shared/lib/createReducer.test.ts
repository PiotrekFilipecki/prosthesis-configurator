import createReducer from './createReducer';

type TestAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; value: number };

const counterReducer = createReducer<number, TestAction>(0, {
  INCREMENT(state) {
    return state + 1;
  },
  DECREMENT(state) {
    return state - 1;
  },
  SET(state, action) {
    return action.value;
  }
});

describe('createReducer', () => {
  it('returns initialState for unknown action', () => {
    const state = counterReducer(undefined, { type: '@@INIT' });
    expect(state).toBe(0);
  });

  it('handles INCREMENT', () => {
    let state = counterReducer(undefined, { type: '@@INIT' });
    state = counterReducer(state, { type: 'INCREMENT' });
    expect(state).toBe(1);
    state = counterReducer(state, { type: 'INCREMENT' });
    expect(state).toBe(2);
  });

  it('handles DECREMENT', () => {
    let state = counterReducer(5, { type: 'DECREMENT' });
    expect(state).toBe(4);
  });

  it('handles SET', () => {
    const state = counterReducer(0, { type: 'SET', value: 42 });
    expect(state).toBe(42);
  });

  it('returns same state for unhandled action', () => {
    const state = counterReducer(10, { type: 'UNKNOWN' as any });
    expect(state).toBe(10);
  });
});
