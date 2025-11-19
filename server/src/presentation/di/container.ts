import { Logger } from 'pino';
import { PostgresUserRepository } from '../../infrastructure/repositories/PostgresUserRepository';
import { PasswordHasher } from '../../infrastructure/services/PasswordHasher';
import { JWTTokenGenerator } from '../../infrastructure/services/JWTTokenGenerator';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/use-cases';
import { config } from '../../config';

class DIContainer {
  private userRepository: PostgresUserRepository | null = null;
  private passwordHasher: PasswordHasher | null = null;
  private tokenGenerator: JWTTokenGenerator | null = null;
  private registerUserUseCase: RegisterUserUseCase | null = null;
  private loginUserUseCase: LoginUserUseCase | null = null;

  public getLoginUserUseCase(logger: Logger): LoginUserUseCase {
    if (!this.loginUserUseCase) {
      const userRepository = this.getUserRepository(logger);
      const passwordHasher = this.getPasswordHasher();
      const tokenGenerator = this.getTokenGenerator();
      
      this.loginUserUseCase = new LoginUserUseCase(
        userRepository,
        passwordHasher,
        tokenGenerator
      );
    }
    return this.loginUserUseCase;
  }
  
  public getRegisterUserUseCase(logger: Logger): RegisterUserUseCase {
    if (!this.registerUserUseCase) {
      const userRepository = this.getUserRepository(logger);
      const passwordHasher = this.getPasswordHasher();
      const tokenGenerator = this.getTokenGenerator();
      
      this.registerUserUseCase = new RegisterUserUseCase(
        userRepository,
        passwordHasher,
        tokenGenerator
      );
    }
    return this.registerUserUseCase;
  }
  
  private getUserRepository(logger: Logger): PostgresUserRepository {
    if (!this.userRepository) {
      this.userRepository = new PostgresUserRepository(logger);
    }
    return this.userRepository;
  }

  private getPasswordHasher(): PasswordHasher {
    if (!this.passwordHasher) {
      this.passwordHasher = new PasswordHasher();
    }
    return this.passwordHasher;
  }

  private getTokenGenerator(): JWTTokenGenerator {
    if (!this.tokenGenerator) {
      const jwtSecret = config.jwt.secret;
      const jwtExpiresIn = config.jwt.expiresIn;
      this.tokenGenerator = new JWTTokenGenerator(jwtSecret, jwtExpiresIn);
    }
    return this.tokenGenerator;
  }
}

export const container = new DIContainer();