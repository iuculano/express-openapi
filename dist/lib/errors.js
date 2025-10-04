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
export class HttpException extends Error {
    code;
    status;
    details;
    constructor(code, message, details) {
        super(message ?? STATUS_CODES[code] ?? 'Unknown');
        this.code = code;
        this.status = STATUS_CODES[code] ?? 'Unknown';
        this.details = details;
    }
    toResponse() {
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
//# sourceMappingURL=errors.js.map