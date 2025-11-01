import { UserResponseDTO } from './UserResponseDTO';

export class AuthResponseDTO {
  public readonly token: string;
  public readonly user: UserResponseDTO;

  constructor(token: string, user: UserResponseDTO) {
    this.token = token;
    this.user = user;
  }
}