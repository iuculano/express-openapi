import type { Request, Response, NextFunction } from 'express';
import { HttpException, type HttpError } from '@lib/errors';
import { STATUS_CODES } from 'http';
//import { HttpError as OpenAPIError } from 'express-openapi-validator/dist/framework/types.js';

export function errorHandler() {

  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    // Known error - one of our routes threw.
    if (err instanceof HttpException) {
      const formatted: HttpError = {
        error: {
          code: err.code,
          status: STATUS_CODES[err.code] ?? 'Unknown',
          message: err.message || 'An error occurred',
          details: err.details,
        },
      };

      return res.status(err.code).json(formatted);
    }


    // Fallback for unhandled errors. We didn't throw it.
    return res.status(500).json({
      error: {
        code: 500,
        status: 'Internal Server Error',
        message: 'An internal server error occurred',
      },
    });

    next(err); // should never happen {
  }
}
