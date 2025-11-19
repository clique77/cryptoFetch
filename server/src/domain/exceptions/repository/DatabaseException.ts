import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class DatabaseException extends DomainException {
  public readonly cause?: Error | undefined;

  constructor(message: string, originalError?: Error) {
    super(message, DOMAIN_ERROR_CODES.DATABASE_ERROR);
    this.cause = originalError;
  }
}