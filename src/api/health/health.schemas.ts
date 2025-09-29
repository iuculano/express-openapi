import * as z from 'zod';


const livezResponse = z.object({
  status: z.literal('alive'),
}).meta({ id: 'LivezResponse' });

const healthzResponse = z.object({
  status: z.literal('ok'),
}).meta({ id: 'HealthzResponse' });

const readyzResponse = z.object({
  status: z.union([z.literal('ok'), z.literal('degraded')]),
  checks: z.object({
    keycloak: z.boolean(),
  }),
}).meta({ id: 'ReadyzResponse' });

export default {
  livezResponse,
  healthzResponse,
  readyzResponse,
};
