import type { RequestHandler } from 'express';
import type pino from 'pino';
declare module 'express-serve-static-core' {
    interface Locals {
        logger?: pino.Logger;
    }
}
export declare function requestLogger(): RequestHandler;
//# sourceMappingURL=request-logger.d.ts.map