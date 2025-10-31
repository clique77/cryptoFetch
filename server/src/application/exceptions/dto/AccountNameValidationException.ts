import { ValidationException } from '../ValidationException';

export class AccountNameValidationException extends ValidationException {
  constructor(message: string, accountName?: string) {
    super('accountName', message, accountName);
  }

  static required(): AccountNameValidationException {
    return new AccountNameValidationException('Account name is required');
  }

  static invalidType(): AccountNameValidationException {
    return new AccountNameValidationException('Account name must be a string');
  }

  static empty(): AccountNameValidationException {
    return new AccountNameValidationException('Account name cannot be empty');
  }

  static tooLong(maxLength: number): AccountNameValidationException {
    return new AccountNameValidationException(
      `Account name cannot exceed ${maxLength} characters`,
      undefined
    );
  }
}