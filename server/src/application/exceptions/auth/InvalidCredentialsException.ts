import { ApplicationException } from "../ApplicationException";

export class InvalidCredentialsException extends ApplicationException {
  constructor() {
    super('Invalid email or password', 'INVALID_CREDENTIALS');
  }
}