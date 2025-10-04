import logger from '../lib/pino.js';
export function requestLogger() {
    return (req, res, next) => {
        // Create a child logger with request-specific details.
        // This is passed down to res.locals so other handlers can use it.
        const child = logger.child({
            requestId: res.locals.requestId,
            method: req.method,
            path: req.path,
        });
        res.locals.logger = child;
        // Time for the start of the request, since we log on finish and need the
        // delta time.
        const timeStart = process.hrtime.bigint();
        // Successful request.
        res.once('finish', () => {
            const durationMs = Number(process.hrtime.bigint() - timeStart) / 1000000;
            const status = res.statusCode;
            const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
            res.locals.logger?.[level]({
                type: 'request_end',
                status,
                durationMs: Math.round(durationMs),
            });
        });
        // Look for aborted requests - i.e. the client disconnected before we
        // could send a response.
        res.once('close', () => {
            // Try to figure out if we actually managed to send a response or not.
            // If we didn't, log a warning.
            if (!res.writableEnded) {
                const durationMs = Number(process.hrtime.bigint() - timeStart) / 1000000;
                res.locals.logger?.warn({
                    type: 'request_aborted',
                    durationMs: Math.round(durationMs),
                });
            }
        });
        next();
    };
}
//# sourceMappingURL=request-logger.js.map