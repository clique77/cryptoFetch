import { ValidationException } from "../ValidationException";

export class EmailValidationException extends ValidationException {
  constructor(message: string, email?: string) {
    super('email', message, email);
  }

  public static required(): EmailValidationException {
    return new EmailValidationException('Email is required');
  }

  public static invalidType(): EmailValidationException {
    return new EmailValidationException(`Please enter a valid email address`);
  }

  public static empty(): EmailValidationException {
    return new EmailValidationException(`Email is required`);
  }

  public static tooLong(maxLength: number): EmailValidationException {
    return new EmailValidationException(`Email cannot exceed ${maxLength}`);
  }
}