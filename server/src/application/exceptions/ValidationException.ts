import { ApplicationException } from "./ApplicationExcpetion";

export class ValidationException extends ApplicationException {
  public readonly field: string;
  public readonly value: unknown;

  constructor(field: string, message: string, value?: unknown) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
    this.value = value;
  }
}