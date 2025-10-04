import { v7 as uuidv7 } from 'uuid';
export function requestId() {
    return (req, res, next) => {
        // Generate a time-ordered unique ID for the request.
        const requestId = uuidv7();
        // Attach it to the request so downstream code can use it.
        res.locals.requestId = requestId;
        res.setHeader('x-request-id', requestId);
        next();
    };
}
//# sourceMappingURL=request-id.js.map