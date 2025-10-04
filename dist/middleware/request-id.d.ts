import type { RequestHandler } from 'express';
declare module 'express-serve-static-core' {
    interface Locals {
        requestId?: string;
    }
}
export declare function requestId(): RequestHandler;
//# sourceMappingURL=request-id.d.ts.map