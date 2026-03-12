import type { RootState } from '../../../store';
import {
  selectApp,
  selectDetails,
  selectPersonalize,
  selectCurrentStep,
  selectCurrentStepConfig,
  selectPersonalizeElements,
  selectActivePart
} from './selectors';

const createMockState = (): RootState => {
  const baseState = {
    app: {
      step: 1 as const,
      barStep: 1,
      barSteps: {},
      steps: {
        1: { id: 1, label: 'Side', title: 'Side', barPercent: 10 },
        2: { id: 2, label: 'Type', title: 'Type', barPercent: 25 },
        3: { id: 3, label: 'Personalise', title: 'Personalise', barPercent: 50 },
        4: { id: 4, label: 'Measurement Info', title: 'Measurement', barPercent: 85 },
        5: { id: 5, label: 'Summary', title: 'Summary', barPercent: 100 }
      }
    },
    details: {
      side: null,
      formValid: false,
      measurments: {},
      orderInfo: {}
    },
    personalize: {
      assetsLoaded: false,
      active: null,
      active_type: 'smart_arm' as const,
      type: {
        smart_arm: {},
        sport_arm: {},
        sport_forearm: {},
        smart_forearm: {},
        smart_forearm_new: {}
      }
    }
  };
  return baseState as RootState;
};

describe('selectors', () => {
  const state = createMockState();

  it('selectApp returns app state', () => {
    expect(selectApp(state)).toBe(state.app);
    expect(selectApp(state).step).toBe(1);
  });

  it('selectDetails returns details state', () => {
    expect(selectDetails(state)).toBe(state.details);
  });

  it('selectPersonalize returns personalize state', () => {
    expect(selectPersonalize(state)).toBe(state.personalize);
  });

  it('selectCurrentStep returns current step id', () => {
    expect(selectCurrentStep(state)).toBe(1);
  });

  it('selectCurrentStepConfig returns step config for current step', () => {
    const config = selectCurrentStepConfig(state);
    expect(config).toBeDefined();
    expect(config?.id).toBe(1);
    expect(config?.label).toBe('Side');
  });

  it('selectPersonalizeElements returns elements map for active type', () => {
    const elements = selectPersonalizeElements(state);
    expect(elements).toBeDefined();
    expect(typeof elements).toBe('object');
  });

  it('selectActivePart returns null when no active part', () => {
    expect(selectActivePart(state)).toBeNull();
  });
});
