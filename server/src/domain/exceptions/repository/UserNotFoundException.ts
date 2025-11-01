import { DomainException } from "../DomainException";
export class UserNotFoundException extends DomainException {
  public readonly id: string;
  public readonly identifier: string;

  constructor(id: string, identifier: string) {
    super(`User not found with ${identifier}: ${id}`, 'USER_NOT_FOUND');
    this.id = id;
    this.identifier = identifier;
  }
}