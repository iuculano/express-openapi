import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
export declare const keycloak: KeycloakAdminClient;
/**
 * Attempts to authenticate with Keycloak using the provided credentials.
 *
 * @param credentials
 * The Keycloak client credentials to use for authentication.
 *
 * @returns
 * Boolean indicating whether authentication was successful.
 */
export declare function keycloakTryAuth(): Promise<boolean>;
//# sourceMappingURL=keycloak.d.ts.map