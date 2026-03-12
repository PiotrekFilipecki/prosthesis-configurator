export const getObjectEntries = <TValue>(
  value: Record<string, TValue>
): Array<[string, TValue]> => Object.entries(value);

export const getObjectValues = <TValue>(value: Record<string, TValue>): TValue[] =>
  Object.values(value);
