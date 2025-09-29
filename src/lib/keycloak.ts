import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import type { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { environment } from '@lib/environment';


export const keycloak = new KeycloakAdminClient({
  baseUrl: environment.KEYCLOAK_ENDPOINT,
  realmName: 'master',
});

const credentials: Credentials = {
  clientId: environment.KEYCLOAK_CLIENT_ID,
  clientSecret: environment.KEYCLOAK_CLIENT_SECRET,
  grantType: 'client_credentials',
};

/**
 * Attempts to authenticate with Keycloak using the provided credentials.
 *
 * @param credentials
 * The Keycloak client credentials to use for authentication.
 *
 * @returns
 * Boolean indicating whether authentication was successful.
 */
export async function keycloakTryAuth(): Promise<boolean> {
  try {
    await keycloak.auth(credentials);
    return true;
  }

  catch {
    return false;
  }
}

await keycloakTryAuth();

// The Keycloak client apparently doesn't refresh automatically internally, so
// we need to do it ourselves.
setInterval(() => keycloakTryAuth(), 58 * 1000);
