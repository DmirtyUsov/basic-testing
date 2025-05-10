import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  _esModule: true,
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyLog = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spyLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const spyLog = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(spyLog).toHaveBeenCalled();
  });
});
