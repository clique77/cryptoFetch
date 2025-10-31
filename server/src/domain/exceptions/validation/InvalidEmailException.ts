import { DomainException } from "../DomainException";

export class InvalidEmailException extends DomainException {
  public readonly email: string;
  
  constructor(email: string) {
    super(`Invalid email format: ${email}`, 'INVALID_EMAIL');
    this.email = email;
  }
}