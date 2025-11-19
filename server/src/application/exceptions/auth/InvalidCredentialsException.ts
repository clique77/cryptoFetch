import { ApplicationException } from "../ApplicationException";
import { APPLICATION_ERROR_CODES } from "../../../constants";

export class InvalidCredentialsException extends ApplicationException {
  constructor() {
    super('Invalid email or password', APPLICATION_ERROR_CODES.INVALID_CREDENTIALS);
  }
}