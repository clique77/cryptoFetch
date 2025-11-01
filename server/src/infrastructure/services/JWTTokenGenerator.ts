import { ITokengenerator } from '../../domain/services/ITokenGenerator';
import { sign, verify, SignOptions, Secret } from 'jsonwebtoken';

export class JWTTokenGenerator implements ITokengenerator {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  public generate(userId: string): string {
    return sign({ userId }, this.secret as Secret, { expiresIn: this.expiresIn } as SignOptions);
  }

  public verify(token: string): { userId: string } | null {
    try {
      const decoded = verify(token, this.secret as Secret) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}