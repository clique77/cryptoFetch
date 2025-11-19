import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class EmptyPasswordException extends DomainException {
  constructor() {
    super('Password cannot be empty', DOMAIN_ERROR_CODES.EMPTY_PASSWORD);
  }
}