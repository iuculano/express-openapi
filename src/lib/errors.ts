import * as z from 'zod'; 
import { STATUS_CODES } from 'http';


// Standardized shape of HTTP error responses.
export const httpError = z.object({
  error: z.object({
    code: z.number(),
    status: z.string(),
    message: z.string(),
    details: z.array(z.record(z.string(), z.unknown())).optional(),
  }).strict(),
}).strict();

export type HttpError = z.infer<typeof httpError>;


export class HttpException extends Error {
  public readonly code: number;
  public readonly status: string;
  public readonly details?: Record<string, unknown>[];

  constructor(code: number, message?: string, details?: Record<string, unknown>[]) {
    super(message ?? STATUS_CODES[code] ?? 'Unknown');
    this.code = code;
    this.status = STATUS_CODES[code] ?? 'Unknown';
    this.details = details;
  }

  toResponse(): HttpError {
    return {
      error: {
        code: this.code,
        status: this.status,
        message: this.message || STATUS_CODES[this.code] || 'Unknown',
        details: this.details,
      },
    };
  }
}

export default {
  httpError,
};
