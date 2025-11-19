import { ApplicationException } from "../ApplicationException";
import { APPLICATION_ERROR_CODES } from "../../../constants";

export class UserAlreadyExistsException extends ApplicationException {
  public readonly email: string;

  constructor(email: string) {
    super(`User with email ${email} already exists`, APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS);
    this.email = email;
  }
}