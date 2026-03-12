import type { RootState } from '../../../store';
import type {
  PersonalizeElement,
  PersonalizeElementsMap,
  PersonalizeState
} from '../../../types/personalize';

export const selectApp = (state: RootState) => state.app;

export const selectDetails = (state: RootState) => state.details;

export const selectPersonalize = (state: RootState): PersonalizeState => state.personalize;

export const selectCurrentStep = (state: RootState) => state.app.step;

export const selectCurrentStepConfig = (state: RootState) => state.app.steps[state.app.step];

export const selectPersonalizeElements = (state: RootState): PersonalizeElementsMap =>
  state.personalize.type[state.personalize.active_type];

export const selectActivePart = (state: RootState): PersonalizeElement | null => {
  const elements = selectPersonalizeElements(state);

  if (!state.personalize.active) {
    return null;
  }

  return elements[state.personalize.active] ?? null;
};
