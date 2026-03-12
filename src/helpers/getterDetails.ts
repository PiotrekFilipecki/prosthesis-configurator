import type { DetailsState } from '../types/details';

export function getFilledOrderInfo(details: DetailsState): string[] {
  return Object.values(details.orderInfo)
    .map((field) => field.value.trim())
    .filter(Boolean);
}
