import Schemas from './health.schemas';
import type { ZodOpenApiPathsObject } from 'zod-openapi';


const livez: ZodOpenApiPathsObject = {
  '/livez': { // endpoint
    get: {   // method
      summary: 'Check service liveliness',
      responses: {
        200: {
          description: 'Service liveliness status',
          content: { 
            'application/json': { schema: Schemas.livezResponse } 
          },
        },
      },
    },
  }
};

const healthz: ZodOpenApiPathsObject = {
  '/healthz': { // endpoint
    get: {   // method
      summary: 'Check service health',
      responses: {
        200: {
          description: 'Service health status',
          content: { 
            'application/json': { schema: Schemas.healthzResponse } 
          },
        },
      },
    },
  }
};

const readyz: ZodOpenApiPathsObject = {
  '/readyz': { // endpoint
    get: {   // method
      summary: 'Check service readiness',
      responses: {
        200: {
          description: 'Service is ready',
          content: { 
            'application/json': { schema: Schemas.readyzResponse } 
          },
        },

        503: {
          description: 'One or more dependencies are failing',
          content: {
            'application/json': { schema: Schemas.readyzResponse },
          },
        },
      },
    },
  }
};

const paths = {
  ...livez,
  ...healthz,
  ...readyz,
}

export default paths;
