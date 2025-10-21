export class ErrorWithMessage extends Error {
  code: string;
  error: boolean;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.error = true;
  }
}
