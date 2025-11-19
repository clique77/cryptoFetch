import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class NegativeBalanceException extends DomainException {
  public readonly balance: number;

  constructor(balance: number) {
    super(`Balance cannot be negative ${balance}`, DOMAIN_ERROR_CODES.NEGATIVE_BALANCE);
    this.balance = balance;
  }
}