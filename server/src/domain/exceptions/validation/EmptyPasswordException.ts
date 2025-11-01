import { DomainException } from "../DomainException";

export class EmptyPasswordException extends DomainException {
  constructor() {
    super('Password cannot be empty', 'EMPTY_PASSWORD');
  }
}