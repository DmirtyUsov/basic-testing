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
    const calcInput = { a, b, action: Action.Subtract };
    const expectedOutput = calcInput.a - calcInput.b;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should multiply two numbers', () => {
    const calcInput = { a, b, action: Action.Multiply };
    const expectedOutput = calcInput.a * calcInput.b;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should divide two numbers', () => {
    const calcInput = { a, b, action: Action.Divide };
    const expectedOutput = calcInput.a / calcInput.b;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should exponentiate two numbers', () => {
    const calcInput = { a, b, action: Action.Exponentiate };
    const expectedOutput = calcInput.a ** calcInput.b;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should return null for invalid action', () => {
    const calcInput = { a, b, action: 'Unknown' };
    const expectedOutput = null;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });

  test('should return null for invalid arguments', () => {
    const calcInput = { a, b: 'invalid', action: Action.Subtract };
    const expectedOutput = null;

    const result = simpleCalculator(calcInput);

    expect(result).toBe(expectedOutput);
  });
});
