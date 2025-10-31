import { EmptyWalletNameException, NegativeBalanceException, WalletNameExceedException } from '../exceptions/wallet';
import Address from '../value-objects/Address';

class Wallet {
  public readonly id: string;
  public readonly address: Address;
  public readonly userId: string;
  public readonly network: string;
  public readonly createdAt: Date;

  private updatedAt: Date;
  private balance: number;
  private name: string;

  private constructor(id: string,
    address: Address,
    userId: string,
    network: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    balance: number
) {
    this.id = id;
    this.address = address;
    this.userId = userId;
    this.network = network;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.balance = balance;
    this.name = name;
  }

  static create(address: Address, userId: string, network: string, name: string): Wallet {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new Wallet(id, address, userId, network, currentDate, currentDate, name, 0);
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getName(): string {
    return this.name;
  }

  public updateBalance(newBalance: number): void {
    if (newBalance < 0) {
      throw new NegativeBalanceException(newBalance);
    }

    this.balance = newBalance;
    this.updatedAt = new Date();
  }

  public updateName(newName: string): void {
    if (!newName || newName.trim() === '') {
      throw new EmptyWalletNameException();
    }

    const trimmedName = newName.trim();
    if (trimmedName.length > 100) {
      throw new WalletNameExceedException(trimmedName, 100);
    }

    this.name = trimmedName;
    this.updatedAt = new Date();
  }

  public belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  public isNetwork(network: string): boolean {
    return this.network.toLowerCase() === network.toLowerCase();
  }
}

export default Wallet;