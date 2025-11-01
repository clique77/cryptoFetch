import { DomainException } from "../DomainException";

export class NegativeBalanceException extends DomainException {
  public readonly balance: number;

  constructor(balance: number) {
    super(`Balance cannot be negative ${balance}`, 'NEGATIVE_BALANCE');
    this.balance = balance;
  }
}