import express from 'express';
import swaggerUi from 'swagger-ui-express';
import OpenApiValidator from 'express-openapi-validator';
import { createDocument } from 'zod-openapi';
import healthPaths from './api/health/health.paths.js';
import healthControllers from './api/health/health.controllers.js';
import { requestId } from './middleware/request-id.js';
import { requestLogger } from './middleware/request-logger.js';
import { errorHandler } from './middleware/error-handler.js';
import {} from './lib/errors.js';
import { STATUS_CODES } from 'http';
const openapi = createDocument({
    openapi: '3.1.1',
    info: { title: 'test', version: '1.0.0' },
    paths: {
        ...healthPaths,
    },
});
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(requestId());
app.use(requestLogger());
// Just serve a dummy favicon to avoid 404 noise in the logs if you hit an
// endpoint in a browser.
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/openapi.json', (_, res) => res.json(openapi));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
app.use(OpenApiValidator.middleware({
    apiSpec: openapi,
    validateRequests: true,
    validateResponses: {
        onError(err, json, req) {
            const formatted = {
                error: {
                    code: err.status || 500,
                    status: STATUS_CODES[err.status] || 'Unknown',
                    message: err.message || 'An error occurred',
                }
            };
            req.res?.locals.logger?.error({
                type: formatted,
                durationMs: Math.round(512321),
            });
            req.res?.status(err.status || 500).json(formatted);
        },
    },
}));
app.use('/', healthControllers);
// Error handler must be last...
app.use(errorHandler());
app.listen(4000, () => {
    console.log('API:  http://localhost:4000');
    console.log('Docs: http://localhost:4000/docs');
});
//# sourceMappingURL=index.js.map