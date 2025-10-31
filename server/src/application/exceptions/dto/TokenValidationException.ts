import { ValidationException } from '../ValidationException';

export class TokenValidationException extends ValidationException {
  constructor(message: string) {
    super('token', message);
  }

  static required(): TokenValidationException {
    return new TokenValidationException('Token is required');
  }

  static invalidType(): TokenValidationException {
    return new TokenValidationException('Token must be a string');
  }

  static empty(): TokenValidationException {
    return new TokenValidationException('Token cannot be empty');
  }
}