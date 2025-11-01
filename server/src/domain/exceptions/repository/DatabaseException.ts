import { DomainException } from "../DomainException";

export class DatabaseException extends DomainException {
  public readonly cause?: Error | undefined;

  constructor(message: string, originalError?: Error) {
    super(message, 'DATABASE_ERROR');
    this.cause = originalError;
  }
}