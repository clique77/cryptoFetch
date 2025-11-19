import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class UserNotFoundException extends DomainException {
  public readonly id: string;
  public readonly identifier: string;

  constructor(id: string, identifier: string) {
    super(`User not found with ${identifier}: ${id}`, DOMAIN_ERROR_CODES.USER_NOT_FOUND);
    this.id = id;
    this.identifier = identifier;
  }
}