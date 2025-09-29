import * as z from 'zod';


const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().regex(/^\d+$/).default('3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'trace']).default('info'),

  KEYCLOAK_ENDPOINT: z.url().default('http://localhost:8080'),
  KEYCLOAK_CLIENT_ID: z.string().default('admin-client'),
  KEYCLOAK_CLIENT_SECRET: z.string().default('REPLACE_ME'),
});

export const environment = environmentSchema.parse(process.env);
