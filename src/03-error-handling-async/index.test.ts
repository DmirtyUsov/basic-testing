import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Test';
    const expectedResult = value;

    const result = resolveValue(value);

    expect(result).resolves.toBe(expectedResult);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Hi!';
    const expectedResult = new Error(message);

    const result = () => throwError(message);

    expect(result).toThrow(expectedResult);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    const expectedResult = new Error(defaultMessage);

    const result = () => throwError();

    expect(result).toThrow(expectedResult);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const expectedResult = MyAwesomeError;

    const result = () => throwCustomError();

    expect(result).toThrow(expectedResult);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const expectedResult = MyAwesomeError;

    const result = () => rejectCustomError();

    await expect(result).rejects.toThrow(expectedResult);
  });
});
