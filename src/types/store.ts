export interface UnknownReduxAction {
  type: string;
}

export type ReducerHandler<TState, TAction extends UnknownReduxAction> = (
  state: TState,
  action: TAction
) => TState;

export type ReducerHandlers<TState, TAction extends UnknownReduxAction> = {
  [Type in TAction['type']]?: ReducerHandler<TState, Extract<TAction, { type: Type }>>;
};
