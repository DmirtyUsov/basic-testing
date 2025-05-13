import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: '#', b: 2, action: Action.Divide, expected: null },
  { a: 2, b: '$', action: Action.Add, expected: null },
  { a: 3, b: 2, action: '#', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
