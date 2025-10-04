import * as z from 'zod';
declare const _default: {
    livezResponse: z.ZodObject<{
        status: z.ZodLiteral<"alive">;
    }, z.core.$strip>;
    healthzResponse: z.ZodObject<{
        status: z.ZodLiteral<"ok">;
    }, z.core.$strip>;
    readyzResponse: z.ZodObject<{
        status: z.ZodUnion<readonly [z.ZodLiteral<"ok">, z.ZodLiteral<"degraded">]>;
        checks: z.ZodObject<{
            keycloak: z.ZodBoolean;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
export default _default;
//# sourceMappingURL=health.schemas.d.ts.map