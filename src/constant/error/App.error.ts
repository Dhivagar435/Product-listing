export class AppError extends Error {
  statuscode: number;
  originalError?: unknown;

  constructor(message: string, statusCode = 500, originalError?: unknown) {
    super(message);
    this.statuscode = statusCode;
    this.originalError = originalError;
  }
}
