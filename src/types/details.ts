export const measurementFieldIds = [
  'mes_1',
  'mes_2',
  'mes_3',
  'mes_4',
  'mes_5',
  'mes_6'
] as const;

export const orderInfoFieldIds = ['mes_7', 'mes_8', 'mes_9', 'mes_10'] as const;

export type MeasurementFieldId = (typeof measurementFieldIds)[number];
export type OrderInfoFieldId = (typeof orderInfoFieldIds)[number];
export type Side = 'L' | 'R' | null;

export interface MeasurementField {
  label: string;
  unit: string;
  value: string;
  valid: boolean;
  touched: boolean;
}

export interface OrderInfoField {
  label: string;
  value: string;
  valid: boolean;
  touched: boolean;
}

export type MeasurementsState = Record<MeasurementFieldId, MeasurementField>;
export type OrderInfoState = Record<OrderInfoFieldId, OrderInfoField>;

export interface DetailsState {
  side: Side;
  formValid: boolean;
  measurments: MeasurementsState;
  orderInfo: OrderInfoState;
}
