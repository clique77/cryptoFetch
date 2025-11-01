import IUserRepository from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { ITokengenerator } from "../../domain/services/ITokenGenerator";
import { LoginUserDTO } from "../dto/LoginUserDTO";
import { AuthResponseDTO } from "../dto/AuthResponseDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { InvalidCredentialsException } from "../exceptions";
import User from "../../domain/entities/User";

export class LoginUserUseCase {
  private userRepository: IUserRepository;
  private passwordHasher: IPasswordHasher;
  private tokenGenerator: ITokengenerator;

  constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, tokenGenerator: ITokengenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  public async execute(dto: LoginUserDTO): Promise<AuthResponseDTO> {
    const user: User = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isValidPassword: boolean = await this.passwordHasher.compare(dto.password, user.getPasswordHash());
    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }

    const token = this.tokenGenerator.generate(user.id);

    const userResponse = new UserResponseDTO(
      user.id,
      user.getEmail(),
      user.getAccountName(),
      user.createdAt
    );

    return new AuthResponseDTO(token, userResponse);
  }
}