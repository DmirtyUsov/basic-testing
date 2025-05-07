import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 10;
  const b = 5;
  test('should add two numbers', () => {
    const calcInput = { a, b, action: Action.Add };
    const expectedOutput = calcInput.a + calcInput.b;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should subtract two numbers', () => {
    // Write your test here
  });

  test('should multiply two numbers', () => {
    // Write your test here
  });

  test('should divide two numbers', () => {
    // Write your test here
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
  });

  test('should return null for invalid action', () => {
    // Write your test here
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
  });
});
