export const selectApp = (state) => state.app;

export const selectDetails = (state) => state.details;

export const selectPersonalize = (state) => state.personalize;

export const selectCurrentStep = (state) => state.app.step;

export const selectCurrentStepConfig = (state) => state.app.steps[state.app.step];

export const selectPersonalizeElements = (state) =>
  state.personalize.type[state.personalize.active_type];

export const selectActivePart = (state) => {
  const elements = selectPersonalizeElements(state);
  return state.personalize.active ? elements[state.personalize.active] : null;
};
