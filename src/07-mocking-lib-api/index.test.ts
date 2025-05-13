import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endpoint = '/data';
  const mockData = { test: 'My test' };
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(endpoint);

    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(endpoint);

    jest.runAllTimers();

    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(endpoint);

    jest.runAllTimers();

    expect(result).toEqual(mockData);
  });
});
