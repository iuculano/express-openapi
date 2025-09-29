import { keycloakTryAuth } from '@lib/keycloak';


/**
 * Checks the connectivity to Keycloak.
 *
 * @returns
 * A promise that resolves to `true` if Keycloak is reachable, otherwise
 * `false`.
 */
async function checkKeycloak(): Promise<boolean> {
  const isAuthenticated = await keycloakTryAuth();
  return isAuthenticated;
}

export default {
  checkKeycloak,
}
