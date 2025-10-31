export class UserRepositoryDTO {
  public readonly id: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly accountName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(id: string, email: string, passwordHash: string, accountName: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.accountName = accountName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}