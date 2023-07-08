// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const initialBalance = 5000;
const fetchedBalance = 50;

let bankAccount: BankAccount;
const accountToTransferTo: BankAccount = getBankAccount(initialBalance);

describe('BankAccount', () => {
  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(bankAccount.getBalance() + 1, accountToTransferTo),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccount.transfer(bankAccount.getBalance() - 1, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const amountBeforeDeposit: number = bankAccount.getBalance();
    const depositAmount = 2000;

    expect(bankAccount.deposit(depositAmount).getBalance()).toBe(
      amountBeforeDeposit + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const amountBeforeWithdrawal: number = bankAccount.getBalance();
    const withdrawAmount = 3000;

    expect(bankAccount.withdraw(withdrawAmount).getBalance()).toBe(
      amountBeforeWithdrawal - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const amountBeforeTransfer: number = bankAccount.getBalance();
    const targetAccountAmountBeforeTransfer: number =
      accountToTransferTo.getBalance();
    const transferAmount = 1000;

    expect(
      bankAccount.transfer(transferAmount, accountToTransferTo).getBalance(),
    ).toBe(amountBeforeTransfer - transferAmount);
    expect(accountToTransferTo.getBalance()).toBe(
      targetAccountAmountBeforeTransfer + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);
    const result = await bankAccount.fetchBalance();
    expect(result).toBe(fetchedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(fetchedBalance);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    const syncBalance = bankAccount.synchronizeBalance.bind(bankAccount);
    await expect(syncBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
