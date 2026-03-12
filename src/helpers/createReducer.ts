import type { Reducer } from 'redux';
import type { ReducerHandlers, UnknownReduxAction } from '../types/store';

export default function createReducer<TState, TAction extends UnknownReduxAction>(
  initialState: TState,
  handlers: ReducerHandlers<TState, TAction>
): Reducer<TState, TAction | UnknownReduxAction> {
  return (state = initialState, action): TState => {
    const handler = handlers[action.type as TAction['type']] as
      | ((state: TState, action: TAction) => TState)
      | undefined;

    if (!handler) {
      return state;
    }

    return handler(state, action as TAction);
  };
}
