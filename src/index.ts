import express from 'express';
import swaggerUi from 'swagger-ui-express'
import OpenApiValidator from 'express-openapi-validator';
import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { createDocument } from 'zod-openapi';

import healthPaths from './api/health/health.paths';
import healthControllers from './api/health/health.controllers';

import { requestId } from '@middleware/request-id';
import { requestLogger } from '@middleware/request-logger';


const openapi = createDocument({
  openapi: '3.1.1',
  info: { title: 'test', version: '1.0.0' },
  paths: {
    ...healthPaths,
  },
});


const app = express();

app.use(express.json());
app.use(requestId());
app.use(requestLogger());

app.get('/openapi.json', (_, res) => res.json(openapi));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

// Health endpoints
app.use(
  OpenApiValidator.middleware({
    apiSpec: openapi as OpenAPIV3.DocumentV3,
    validateRequests: true,
    
    validateResponses: {
      onError: (error) => {
        console.log('Malformed response - this is likely a bug.', error);
      }
    },
  })
);

app.use('/', healthControllers);


app.listen(4000, () => {
  console.log('API:  http://localhost:3000');
  console.log('Docs: http://localhost:3000/docs');
});
