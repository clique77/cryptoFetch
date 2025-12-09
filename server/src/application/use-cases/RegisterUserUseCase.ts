import IUserRepository from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { ITokengenerator } from "../../domain/services/ITokenGenerator";
import { RegisterUserDTO } from "../dto/RegisterUserDTO";
import { AuthResponseDTO } from "../dto/AuthResponseDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { UserAlreadyExistsException } from "../exceptions";
import User from "../../domain/entities/User";

export class RegisterUserUseCase {
  private userRepository: IUserRepository;
  private passwordHasher: IPasswordHasher;
  private tokenGenerator: ITokengenerator;
  
  //TODO: разобраться

  constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, tokenGenerator: ITokengenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  public async execute(dto: RegisterUserDTO): Promise<AuthResponseDTO> {
    const existingUser: User | null = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(dto.email);
    }

    const passwordHash: string = await this.passwordHasher.hash(dto.password);

    const user: User = User.create(
      dto.email,
      passwordHash,
      dto.accountName
    );

    await this.userRepository.save(user);
    const token: string = this.tokenGenerator.generate(user.id);

    const userResponse: UserResponseDTO = new UserResponseDTO(
      user.id,
      user.getEmail(),
      user.getAccountName(),
      user.createdAt
    );

    return new AuthResponseDTO(token, userResponse);
  }
}