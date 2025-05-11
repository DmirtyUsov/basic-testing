import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  const timeoutMs = 500;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeoutMs);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(callback, timeoutMs);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, timeoutMs);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const intervalInMs = 300;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, intervalInMs);

    expect(setIntervalSpy).toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenLastCalledWith(callback, intervalInMs);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const times = 3;

    doStuffByInterval(callback, intervalInMs);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(intervalInMs * times);

    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  const fsMock = fs as jest.Mocked<typeof fs>;

  const pathToFile = 'my-test.txt';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(pathJoinSpy).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    fsMock.existsSync = jest.fn().mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Content';
    const fsPromisesMock = fsPromises as jest.Mocked<typeof fsPromises>;
    fsPromisesMock.readFile = jest.fn().mockImplementation(() => {
      return Promise.resolve(Buffer.from(fileContent));
    });
    fsMock.existsSync = jest.fn().mockReturnValue(true);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
