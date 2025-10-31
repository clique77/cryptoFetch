import { DomainException } from "../DomainException";

export class WalletNameExceedException extends DomainException {
  public readonly walletName: string;
  public readonly maxLength: number;

  constructor(walletName: string, maxLength: number) {
    super(
      `Wallet name "${walletName}" exceeds maximum length of ${maxLength} characters`,
      'WALLET_NAME_EXCEED_MAX_LENGTH'
    );
    this.walletName = walletName;
    this.maxLength = maxLength;
  }
}