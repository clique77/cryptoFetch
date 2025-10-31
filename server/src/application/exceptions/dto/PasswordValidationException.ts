import { ValidationException } from '../ValidationException';

export class PasswordValidationException extends ValidationException {
  constructor(message: string, password?: string) {
    super('password', message, password);
  }

  static required(): PasswordValidationException {
    return new PasswordValidationException('Password is required');
  }

  static invalidType(): PasswordValidationException {
    return new PasswordValidationException('Password must be a string');
  }

  static empty(): PasswordValidationException {
    return new PasswordValidationException('Password cannot be empty');
  }

  static tooShort(minLength: number): PasswordValidationException {
    return new PasswordValidationException(
      `Password must be at least ${minLength} characters long`,
      undefined
    );
  }
}