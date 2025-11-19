import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class AccountNameExceedException extends DomainException {
  public readonly accountName: string;
  public readonly maxLength: number;

  constructor(accountName: string, maxLength: number) {
    super(
      `Account name ${accountName} exceeds maximum length of ${maxLength} characters`,
      DOMAIN_ERROR_CODES.ACCOUNT_NAME_EXCEED_MAX_LENGTH
    );
    this.accountName = accountName;
    this.maxLength = maxLength;
  }
}