import { AccountNameValidationException, EmailValidationException, PasswordValidationException } from "../exceptions";

export class RegisterUserDTO {
  public readonly email: string;
  public readonly password: string;
  public readonly accountName: string;

  constructor(email: string, password: string, accountName: string) {
    if (typeof email !== 'string') {
      throw EmailValidationException.invalidType();
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail === '') {
      throw EmailValidationException.empty();
    }

    if (trimmedEmail.length > 254) {
      throw EmailValidationException.tooLong(254);
    }

    if (typeof password !== 'string') {
      throw PasswordValidationException.invalidType();  
    }

    if (password === '') {
      throw PasswordValidationException.empty();
    }

    if (password.length < 8) {
      throw PasswordValidationException.tooShort(8);
    }

    if (typeof accountName !== 'string') {
      throw AccountNameValidationException.invalidType();
    }
    
    const trimmedAccountName = accountName.trim();
    if (trimmedAccountName === '') {
      throw AccountNameValidationException.empty();
    }
    
    this.email = trimmedEmail;
    this.password = password;
    this.accountName = trimmedAccountName;
  }
}