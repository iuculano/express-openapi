import Schemas from './health.schemas.js';
const livez = {
    '/livez': {
        get: {
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
const healthz = {
    '/healthz': {
        get: {
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
const readyz = {
    '/readyz': {
        get: {
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
};
export default paths;
//# sourceMappingURL=health.paths.js.map