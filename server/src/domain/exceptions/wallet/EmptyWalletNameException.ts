import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class EmptyWalletNameException extends DomainException {
  constructor() {
    super(`Wallet name cannot be empty`, DOMAIN_ERROR_CODES.EMPTY_WALLET_NAME);
  }
}