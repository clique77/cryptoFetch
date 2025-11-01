import { ValidationException } from "../ValidationException";

export class EmailValidationException extends ValidationException {
  constructor(message: string, email?: string) {
    super('email', message, email);
  }

  public static required(): EmailValidationException {
    return new EmailValidationException('Email is required');
  }

  public static invalidType(): EmailValidationException {
    return new EmailValidationException(`Invalid email must be a string`);
  }

  public static empty(): EmailValidationException {
    return new EmailValidationException(`Email cannot be empty`);
  }

  public static tooLong(maxLength: number): EmailValidationException {
    return new EmailValidationException(`Email cannot exceed ${maxLength}`);
  }
}