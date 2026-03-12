import type { DetailsState } from './details';

export const colorIds = [
  'black',
  'orange',
  'pink',
  'white',
  'red',
  'gold',
  'silver',
  'blue',
  'green',
  'violet'
] as const;

export const finishingKeys = ['matt', 'shine'] as const;
export const finishingValues = ['matte', 'glossy'] as const;

export const prosthesisTypes = [
  'smart_arm',
  'sport_arm',
  'sport_forearm',
  'smart_forearm',
  'smart_forearm_new'
] as const;

export type ColorId = (typeof colorIds)[number];
export type FinishingKey = (typeof finishingKeys)[number];
export type FinishingValue = (typeof finishingValues)[number];
export type ProsthesisType = (typeof prosthesisTypes)[number];

export interface ColorOption {
  hex: string;
}

export interface ModelName {
  name: string;
}

export interface PersonalizeElement {
  id: number;
  name: string;
  path: string;
  x: number;
  y: number;
  width: number;
  label: string;
  selectedColor: ColorId;
  selectedFinishing: FinishingValue;
}

export type PersonalizeElementsMap = Record<string, PersonalizeElement>;
export type ColorMap = Record<ColorId, ColorOption>;
export type FinishingMap = Record<FinishingKey, FinishingValue>;
export type ModelNamesMap = Record<ProsthesisType, ModelName>;
export type ProsthesisMap = Record<ProsthesisType, PersonalizeElementsMap>;

export interface PersonalizeState {
  assetsLoaded: boolean;
  active: string | null;
  hover: number | null;
  colors: ColorMap;
  finishing: FinishingMap;
  active_type: ProsthesisType;
  model_names: ModelNamesMap;
  type: ProsthesisMap;
}

export interface GenerateSummaryPdfInput {
  targetElement: HTMLElement;
  details: DetailsState;
  personalize: PersonalizeState;
}
