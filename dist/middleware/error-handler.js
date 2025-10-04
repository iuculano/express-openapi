import { HttpException } from '../lib/errors.js';
import { STATUS_CODES } from 'http';
//import { HttpError as OpenAPIError } from 'express-openapi-validator/dist/framework/types.js';
export function errorHandler() {
    return (err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        // Known error - one of our routes threw.
        if (err instanceof HttpException) {
            const formatted = {
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
    };
}
//# sourceMappingURL=error-handler.js.map