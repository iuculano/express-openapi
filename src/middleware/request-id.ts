import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { v7 as uuidv7 } from 'uuid';


// Extend the Request interface to include requestId.
declare module 'express-serve-static-core' {
  interface Locals {
    requestId?: string;
  }
}
export function requestId(): RequestHandler {
  
  return (req: Request, res: Response, next: NextFunction): void => {
    // Generate a time-ordered unique ID for the request.
    const requestId = uuidv7();

    // Attach it to the request so downstream code can use it.
    res.locals.requestId = requestId;
    res.setHeader('x-request-id', requestId);

    next();
  }
}
