// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 35, b: 10, action: Action.Add, expected: 45 },
  { a: 13, b: 20, action: Action.Subtract, expected: -7 },
  { a: -5, b: 50, action: Action.Multiply, expected: -250 },
  { a: 44, b: 11, action: Action.Divide, expected: 4 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 44, b: 11, action: 'log', expected: null },
  { a: '2', b: 32, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$action-ing $a and $b should result in $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
