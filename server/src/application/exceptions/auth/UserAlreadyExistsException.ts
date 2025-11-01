import { ApplicationException } from "../ApplicationException";

export class UserAlreadyExistsException extends ApplicationException {
  public readonly email: string;

  constructor(email: string) {
    super(`User with email ${email} already exists`, 'USER_ALREADY_EXISTS');
    this.email = email;
  }
}