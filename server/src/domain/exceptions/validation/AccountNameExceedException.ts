import { DomainException } from "../DomainException";

export class AccountNameExceedException extends DomainException {
  public readonly accountName: string;
  public readonly maxLength: number;

  constructor(accountName: string, maxLength: number) {
    super(
      `Account name ${accountName} exceeds maximum length of ${maxLength} characters`,
      'ACCOUNT_NAME_EXCEED_MAX_LENGTH'
    );
    this.accountName = accountName;
    this.maxLength = maxLength;
  }
}