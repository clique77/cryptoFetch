export class UserResponseDTO {
  public readonly id: string;
  public readonly email: string;
  public readonly accountName: string;
  public readonly createdAt: Date;

  constructor(id: string, email: string, accountName: string, createdAt: Date) {
    this.id = id;
    this.email = email;
    this.accountName = accountName;
    this.createdAt = createdAt;
  }
}