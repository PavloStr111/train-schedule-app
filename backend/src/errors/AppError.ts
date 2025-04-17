export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly status: string;
  
    constructor(message: string, statusCode = 500, isOperational = true) {
      super(message);
      
      Object.setPrototypeOf(this, new.target.prototype);

      this.statusCode = statusCode;
      
      this.status = `${this.statusCode}`.startsWith('4') ? 'fail': 'error'

      this.isOperational = isOperational;

      Error.captureStackTrace(this);
    }
  }
  