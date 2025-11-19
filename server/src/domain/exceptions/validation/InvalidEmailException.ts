import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class InvalidEmailException extends DomainException {
  public readonly email: string;
  
  constructor(email: string) {
    super(`Invalid email format: ${email}`, DOMAIN_ERROR_CODES.INVALID_EMAIL);
    this.email = email;
  }
}