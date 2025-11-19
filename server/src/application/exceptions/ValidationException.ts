import { ApplicationException } from "./ApplicationException";
import { APPLICATION_ERROR_CODES } from "../../constants";

export class ValidationException extends ApplicationException {
  public readonly field: string;
  public readonly value: unknown;

  constructor(field: string, message: string, value?: unknown) {
    super(message, APPLICATION_ERROR_CODES.VALIDATION_ERROR);
    this.field = field;
    this.value = value;
  }
}