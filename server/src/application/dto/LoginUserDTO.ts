import { EmailValidationException, PasswordValidationException } from "../exceptions";

export class LoginUserDTO {
  public readonly email: string;
  public readonly password: string;

  constructor(email: string, password: string) {
    if (!email || typeof email !== 'string') {
      throw EmailValidationException.invalidType();
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail === '') {
      throw EmailValidationException.empty();
    }

    if (trimmedEmail.length > 254) {
      throw EmailValidationException.tooLong(254);
    }

    if (!password || typeof password !== 'string') {
      throw PasswordValidationException.invalidType();
    }

    const trimmedPassword = password.trim();
    if (trimmedPassword === '') {
      throw PasswordValidationException.empty();
    }

    this.email = trimmedEmail;
    this.password = trimmedPassword;
  }
}