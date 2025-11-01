import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import bcrypt from 'bcrypt';

export class PasswordHasher implements IPasswordHasher {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}