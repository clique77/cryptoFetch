import { DomainException } from "../DomainException";

export class EmptyWalletNameException extends DomainException {
  constructor() {
    super(`Wallet name cannot be empty`, 'EMPTY_WALLET_NAME');
  }
}