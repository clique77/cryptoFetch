import { DomainException } from "../DomainException";

export class InvalidAccountNameException extends DomainException {
  public readonly accountName: string;

  constructor(accountName: string) {
    super(`Invalid account name ${accountName}`, 'INVALID_ACCOUNT_NAME');
    this.accountName = accountName;
  }
}