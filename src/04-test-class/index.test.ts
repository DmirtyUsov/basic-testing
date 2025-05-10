import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initAmount = 100;
  let spyOnRandom: jest.SpyInstance;

  beforeEach(() => {
    spyOnRandom = jest.spyOn(lodash, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = initAmount;

    const result = srcAccount.getBalance();

    expect(result).toBe(expected);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = InsufficientFundsError;

    const result = () => srcAccount.withdraw(initAmount * 2);

    expect(result).toThrow(expected);
  });

  test('should throw error when transferring more than balance', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const dstAccount: BankAccount = getBankAccount(initAmount);
    const expected = Error;

    const result = () => srcAccount.transfer(initAmount * 2, dstAccount);

    expect(result).toThrow(expected);
  });

  test('should throw error when transferring to the same account', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = Error;

    const result = () => srcAccount.transfer(initAmount, srcAccount);

    expect(result).toThrow(expected);
  });

  test('should deposit money', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = initAmount * 2;

    const result = srcAccount.deposit(initAmount).getBalance();

    expect(result).toBe(expected);
  });

  test('should withdraw money', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = 0;

    const result = srcAccount.withdraw(initAmount).getBalance();

    expect(result).toBe(expected);
  });

  test('should transfer money', () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const dstAccount: BankAccount = getBankAccount(initAmount);
    const srcExpected = 0;
    const dstExpected = initAmount * 2;

    const srcResult = srcAccount.transfer(initAmount, dstAccount).getBalance();
    const dstResult = dstAccount.getBalance();

    expect(srcResult).toBe(srcExpected);
    expect(dstResult).toBe(dstExpected);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomBalance = initAmount + 1;
    const randomValue = 1;
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = expect.any(Number);
    spyOnRandom
      .mockReturnValueOnce(randomBalance)
      .mockReturnValueOnce(randomValue);

    const balance = await srcAccount.fetchBalance();

    expect(balance).toEqual(expected);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = initAmount + 7;
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = newBalance;
    spyOnRandom.mockReturnValueOnce(newBalance).mockReturnValueOnce(1);

    await srcAccount.synchronizeBalance();
    const result = srcAccount.getBalance();

    expect(result).toEqual(expected);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const srcAccount: BankAccount = getBankAccount(initAmount);
    const expected = SynchronizationFailedError;
    spyOnRandom.mockReturnValueOnce(initAmount).mockReturnValueOnce(0);

    const result = () => srcAccount.synchronizeBalance();

    await expect(result).rejects.toThrow(expected);
  });
});
