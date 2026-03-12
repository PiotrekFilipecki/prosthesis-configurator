import type {
  ColorId,
  FinishingKey,
  FinishingValue
} from '../../types/personalize';

export const COLORS: Record<ColorId, ColorId> = {
  black: 'black',
  orange: 'orange',
  white: 'white',
  red: 'red',
  gold: 'gold',
  silver: 'silver',
  pink: 'pink',
  blue: 'blue',
  green: 'green',
  violet: 'violet'
};

export const FINISHING: Record<FinishingKey, FinishingValue> = {
  shine: 'glossy',
  matt: 'matte'
};
