// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 35, b: 10, action: Action.Add })).toBe(45);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 13, b: 20, action: Action.Subtract })).toBe(
      -7,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: -5, b: 50, action: Action.Multiply })).toBe(
      -250,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 44, b: 11, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Exponentiate })).toBe(
      64,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 44, b: 11, action: 'log' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '2', b: 32, action: Action.Multiply }),
    ).toBeNull();
  });
});
