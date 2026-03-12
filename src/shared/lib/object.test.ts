import { getObjectEntries, getObjectValues } from './object';

describe('object utils', () => {
  describe('getObjectEntries', () => {
    it('returns correct entries for object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const entries = getObjectEntries(obj);
      expect(entries).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
    });

    it('returns empty array for empty object', () => {
      expect(getObjectEntries({})).toEqual([]);
    });
  });

  describe('getObjectValues', () => {
    it('returns correct values for object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const values = getObjectValues(obj);
      expect(values).toEqual([1, 2, 3]);
    });

    it('returns empty array for empty object', () => {
      expect(getObjectValues({})).toEqual([]);
    });
  });
});
