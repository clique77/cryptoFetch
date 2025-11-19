import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class InvalidAccountNameException extends DomainException {
  public readonly accountName: string;

  constructor(accountName: string) {
    super(`Invalid account name ${accountName}`, DOMAIN_ERROR_CODES.INVALID_ACCOUNT_NAME);
    this.accountName = accountName;
  }
}