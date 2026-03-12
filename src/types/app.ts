export const stepIds = [1, 2, 3, 4, 5] as const;

export type StepId = (typeof stepIds)[number];

export interface StepConfig {
  id: StepId;
  label: string;
  title: string;
  barPercent: number;
}

export type StepsMap = Record<StepId, StepConfig>;

export interface AppState {
  step: StepId;
  steps: StepsMap;
  barStep: number;
  barSteps: Record<string, never>;
}
