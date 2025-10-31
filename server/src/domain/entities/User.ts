import {
  InvalidEmailException,
  InvalidAccountNameException,
  EmptyPasswordException,
  AccountNameExceedException
} from "../exceptions/validation";

class User {
  public readonly id: string;
  public readonly createdAt: Date;

  private email: string;
  private accountName: string;
  private readonly passwordHash: string;
  private updatedAt: Date;

  private constructor(
    id: string,
    email: string,
    passwordHash: string,
    accountName: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.accountName = accountName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getEmail(): string {
    return this.email;
  }

  public getAccountName(): string {
    return this.accountName;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public static create(email: string, passwordHash: string, accountName: string): User {
    if (!User.isValidEmail(email)) {
      throw new InvalidEmailException(email);
    }

    if (!User.validate(accountName)) {
      throw new InvalidAccountNameException(accountName);
    }

    if (!passwordHash || passwordHash.trim() === '') {
      throw new EmptyPasswordException();
    }

    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new User(id, email.trim(), passwordHash, accountName.trim(), currentDate, currentDate);
  }

  public updateAccountName(newAccountName: string): void {
    if (!User.validate(newAccountName)) {
      throw new InvalidAccountNameException(newAccountName);
    }

    const trimmedAccountName = newAccountName.trim();
    if (trimmedAccountName.length > 100) {
      throw new AccountNameExceedException(trimmedAccountName, 100);
    }

    this.accountName = trimmedAccountName;
    this.updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    if (!User.isValidEmail(newEmail)) {
      throw new InvalidEmailException(newEmail);
    }

    this.email = newEmail.trim();
    this.updatedAt = new Date();
  }

  public static restore(id: string,
    email: string,
    passwordHash: string,
    accountName: string,
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(id, email, passwordHash, accountName, createdAt, updatedAt);
  }

  private static validate(input: string): boolean {
    if (!input || input.trim() === '') {
      return false;
    }

    return true;
  }

  private static isValidEmail(email: string): boolean {
    if (!email || email.trim() === '') {
      return false;
    }

    if (email.length > 254) {
      return false;
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default User;