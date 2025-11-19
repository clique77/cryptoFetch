import { DomainException } from "../DomainException";
import { DOMAIN_ERROR_CODES } from "../../../constants";

export class WalletNameExceedException extends DomainException {
  public readonly walletName: string;
  public readonly maxLength: number;

  constructor(walletName: string, maxLength: number) {
    super(
      `Wallet name "${walletName}" exceeds maximum length of ${maxLength} characters`,
      DOMAIN_ERROR_CODES.WALLET_NAME_EXCEED_MAX_LENGTH
    );
    this.walletName = walletName;
    this.maxLength = maxLength;
  }
}