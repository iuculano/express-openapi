import * as z from 'zod';
export declare const httpError: z.ZodObject<{
    error: z.ZodObject<{
        code: z.ZodNumber;
        status: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, z.core.$strict>;
}, z.core.$strict>;
export type HttpError = z.infer<typeof httpError>;
export declare class HttpException extends Error {
    readonly code: number;
    readonly status: string;
    readonly details?: Record<string, unknown>[];
    constructor(code: number, message?: string, details?: Record<string, unknown>[]);
    toResponse(): HttpError;
}
declare const _default: {
    httpError: z.ZodObject<{
        error: z.ZodObject<{
            code: z.ZodNumber;
            status: z.ZodString;
            message: z.ZodString;
            details: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, z.core.$strict>;
    }, z.core.$strict>;
};
export default _default;
//# sourceMappingURL=errors.d.ts.map