import { keycloakTryAuth } from '../../lib/keycloak.js';
/**
 * Checks the connectivity to Keycloak.
 *
 * @returns
 * A promise that resolves to `true` if Keycloak is reachable, otherwise
 * `false`.
 */
async function checkKeycloak() {
    const isAuthenticated = await keycloakTryAuth();
    return isAuthenticated;
}
export default {
    checkKeycloak,
};
//# sourceMappingURL=health.services.js.map