// import * as z from 'zod';
// import type ClientRepresentation from '@keycloak/keycloak-admin-client/lib/defs/clientRepresentation';
// import type ProtocolMapperRepresentation from '@keycloak/keycloak-admin-client/lib/defs/protocolMapperRepresentation';
// import type RealmRepresentation from '@keycloak/keycloak-admin-client/lib/defs/realmRepresentation';
// import { keycloak } from '@lib/keycloak';
// 
// 
// const realmKeyRegex = /^[a-z0-9-]{1,64}$/;
// 
// /**
//  * Schema for security settings in a realm.
//  *
//  * - `require_ssl`: 
//  *    Specifies the SSL requirement for the realm.
//  *   - `none`:     No SSL required.
//  *   - `external`: SSL required for external requests.
//  *   - `all`:      SSL required for all requests (default).
//  *
//  * - `enable_user_registration`:
//  *    Allows users to register themselves.
//  * 
//  * - `enable_forgot_password`:
//  *    Enables forgot password functionality.
//  *
//  * - `enable_remember_me`:
//  *    Enables "remember me" option during login.
//  */
// const security = z.object({
//   require_ssl: z.enum(['none', 'external', 'all']).default('all'),
//   enable_user_registration: z.boolean().optional().default(false),
//   enable_forgot_password: z.boolean().optional().default(false),
//   enable_remember_me: z.boolean().optional().default(false),
// });
// 
// /**
//  * Schema for password policy settings in a realm.
//  *
//  * - `require_length`:
//  *    Minimum password length required.
//  * 
//  * - `require_lowercase`:
//  *    Requires at least one lowercase character.
//  * 
//  * - `require_uppercase`:
//  *    Requires at least one uppercase character.
//  * 
//  * - `require_numbers`:
//  *    Requires at least one numeric character.
//  * 
//  * - `history_length`:
//  *    Number of previous passwords to keep in history.
//  */
// const passwordPolicy = z.object({
//   require_length: z.number().int().min(6).max(128).optional().default(12),
// 
//   require_lowercase: z.boolean().optional().default(true),
//   require_uppercase: z.boolean().optional().default(true),
//   require_numbers: z.boolean().optional().default(true),
//   history_length: z.number().int().min(0).max(24).optional().default(24),
// 
//   enable_permanent_lockout: z.boolean().optional().default(false),
//   max_temporary_lockouts: z.number().int().min(0).optional().default(0),
//   failure_factor: z.number().int().min(1).max(10).optional().default(5),
//   failure_wait_increment_seconds: z.number().int().min(30).max(600).optional().default(120),
//   failure_wait_max_seconds: z.number().int().min(300).max(7200).optional().default(3600),
//   quick_login_wait_seconds: z.number().int().min(30).max(300).optional().default(60),
//   quick_login_check_seconds: z.number().int().min(1000).max(10000).optional().default(5),
//   failure_reset_seconds: z.number().int().min(3600).max(172800).optional().default(86400),
// });
// 
// 
// /**
//  * Schema for defining protocol mappers for a client.
//  *
//  * - `type`:
//  *    Type of the mapper.
//  *    - `hardcoded`: Maps a fixed value to a claim.
//  *    - `attribute`: Maps a user attribute to a claim.
//  *
//  * - `claim_name`:
//  *    Name of the claim to be mapped.
//  *
//  * - `claim_value`:
//  *    Value or attribute to be mapped.
//  * 
//  * - `claim_type`:
//  *    Data type of the claim (default: 'string').
//  * 
//  * - `map_to_access_token`:
//  *    Whether to map the claim to the access token.
//  * 
//  * - `map_to_id_token`:
//  *    Whether to map the claim to the ID token.
//  * 
//  * - `map_to_userinfo`:
//  *    Whether to map the claim to the userinfo endpoint.
//  *
//  * - `map_to_introspection`:
//  *    Whether to map the claim to the introspection endpoint.
//  */
// const clientMapper = z.object({
//   type: z.enum(['hardcoded', 'attribute']),
//   claim_name: z.string(),
//   claim_value: z.string(),
//   claim_type: z.string().default('string'),
//   map_to_access_token: z.boolean().optional().default(false),
//   map_to_id_token: z.boolean().optional().default(false),
//   map_to_userinfo: z.boolean().optional().default(false),
//   map_to_introspection: z.boolean().optional().default(false),
// });
// 
// /**
//  * Schema for defining a client within a realm.
//  *
//  * - `name`: 
//  *    Unique identifier for the client. Must match /^[a-z0-9-]{1,64}$/.
//  * 
//  * - `description`:
//  *    Description of the client.
//  * 
//  * - `root_url`:
//  *    Optional root URL for the client.
//  * 
//  * - `base_url`:
//  *    Optional base URL for the client.
//  * 
//  * - `web_origins`:
//  *    Array of allowed web origins for CORS. Defaults to [].
//  * 
//  * - `redirect_uris`:
//  *    Array of allowed redirect URIs. Defaults to [].
//  * 
//  * - `is_public`:
//  *    Indicates if the client is public/non-confidential. Defaults to true.
//  *
//  * - `grant_type`:
//  *    OAuth2 grant type. Either 'authorization_code' or 'client_credentials'. Defaults to 'authorization_code'.
//  *
//  * - `mappers`:
//  *    Array of protocol mappers for the client. Defaults to [].
//  */
// const client = z.object({
//   name: z.string().regex(/^[a-z0-9-]{1,64}$/),
//   grant_type: z.enum(['authorization_code', 'client_credentials']),
//   is_public: z.boolean().default(true),
// 
//   description: z.string().optional(),
//   root_url: z.string().optional(),
//   base_url: z.string().optional(),
//   web_origins: z.array(z.string()).optional(),
//   redirect_uris: z.array(z.string()).optional(),
// 
//   mappers: z.array(clientMapper).optional(),
// });
// 
// // --- realm schema ---
// export const realmShape = z.object({
//   name: z.string().regex(realmKeyRegex),
//   display_name: z.string().min(2),
//   description: z.string().optional(),
//   security: security.optional(),
//   password: passwordPolicy.optional(),
//   clients: z.array(client).optional(),
// });
// 
// 
// type Client = z.infer<typeof client>;
// type ClientMapper = z.infer<typeof clientMapper>;
// export type Realm = z.infer<typeof realmShape>;
// 
// const createRealmRequest = realmShape;
// const createRealmResponse = realmShape;
// 
// export type CreateRealmRequest = z.infer<typeof createRealmRequest>;
// export type CreateRealmResponse = z.infer<typeof createRealmResponse>;
// 
// 
// export async function toKeycloakRealm(input: Realm): Promise<RealmRepresentation> {
//   return {
//     enabled: true,
// 
//     realm: input.name,
//     displayName: input.display_name,
// 
//     adminEventsEnabled: true,
//     adminEventsDetailsEnabled: true,
//     eventsEnabled: true,
//     eventsExpiration: 86400, // 1 day
//     eventsListeners: ['jboss-logging'],
// 
//     sslRequired: input.security?.require_ssl,
//     registrationAllowed: input.security?.enable_user_registration,
//     resetPasswordAllowed: input.security?.enable_forgot_password,
//     rememberMe: input.security?.enable_remember_me,
//     verifyEmail: true,
// 
//     bruteForceStrategy: 'MULTIPLE',
//     permanentLockout: input.password?.enable_permanent_lockout,
//     maxTemporaryLockouts: input.password?.max_temporary_lockouts,
//     failureFactor: input.password?.failure_factor,
//     waitIncrementSeconds: input.password?.failure_wait_increment_seconds,
//     maxFailureWaitSeconds: input.password?.failure_wait_max_seconds,
//     minimumQuickLoginWaitSeconds: input.password?.quick_login_wait_seconds,
//     quickLoginCheckMilliSeconds: input.password?.quick_login_check_seconds && input.password.quick_login_check_seconds * 1000,
//     maxDeltaTimeSeconds: input.password?.failure_reset_seconds,
// 
//     clients: (input.clients ?? []).map<ClientRepresentation>(client => ({
//       enabled: true,
// 
//       clientId: client.name,
//       name: client.name,
//       description: client.description,
//       publicClient: client.is_public,
//       rootUrl: client.root_url,
//       baseUrl: client.base_url,
//       webOrigins: client.web_origins,
//       redirectUris: client.redirect_uris,
//       standardFlowEnabled: client.grant_type === 'authorization_code',
//       serviceAccountsEnabled: client.grant_type === 'client_credentials',
// 
//       protocol: 'openid-connect',
//       protocolMappers: (client.mappers ?? []).map<ProtocolMapperRepresentation>(mapper => ({
//         name: mapper.claim_name,
//         protocol: 'openid-connect',
//         protocolMapper: mapper.type === 'hardcoded' ? 'oidc-hardcoded-claim-mapper' : 'oidc-usermodel-attribute-mapper',
// 
//         // This is a bit magical because it's just an arbitrary key-value bag
//         config: {
//           "claim.name": mapper.claim_name,
//           "claim_type": 'String', //mapper.claim_type,
//           "id_token_claim": mapper.map_to_id_token,          
//           "lightweight_claim": mapper.map_to_access_token,
//           "userinfo_token_claim": mapper.map_to_userinfo,          
//           "introspection_token_claim": mapper.map_to_introspection,
// 
//           ...(mapper.claim_type === 'hardcoded' ? 
//             { 'claim.value': mapper.claim_value } :
//             { 'user.attribute': mapper.claim_value }),
//         }
//       })),
//     })),
// 
//     attributes: {
//       // This is vaguely named, but this is for the authentication_code.
//       // It does not affect other types like client_credentials.
//       'use.refresh.tokens': 'true',
// 
//       // Always use lightweight access tokens - the default regular Keycloak
//       // access tokens are super bloated. This slims them severely.
//       'client.use.lightweight.access.token.enabled': 'true',
//     },
//   }
// }
// 
// 
// export async function fromKeycloakRealm(input: RealmRepresentation): Promise<Realm> {
//   // eslint is probably being too whiny here, there's no way this can possibly
//   // be null because you can't have a Realm without a name, even though the type
//   // technically allows.
//   return {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     name: input.realm!,
// 
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     display_name: input.displayName || input.realm!,
// 
//     clients: (input.clients ?? []).map<Client>(client => ({
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       name: client.clientId!,
//       grant_type: (client.standardFlowEnabled ? 'authorization_code' : 'client_credentials'),
//       is_public: client.publicClient ?? true,
// 
//       description: client.description,
//       root_url: client.rootUrl,
//       base_url: client.baseUrl,
//       web_origins: client.webOrigins ?? [],
//       redirect_uris: client.redirectUris ?? [],
// 
//       mappers: (client.protocolMappers ?? []).map<ClientMapper>(mapper => ({
//         type: mapper.protocolMapper === 'oidc-hardcoded-claim-mapper' ? 'hardcoded' : 'attribute',
// 
//         claim_name: mapper.config?.['claim.name'],
//         claim_value: mapper.config?.['claim.value'],
//         claim_type: mapper.config?.['jsonType.label'] || 'String',
// 
//         // Only support Lightweight Access Tokens for now
//         map_to_access_token: mapper.config?.['lightweight_claim'] === 'true' ? true : false,
//         map_to_id_token: mapper.config?.['id_token_claim'] === 'true' ? true : false,
//         map_to_userinfo: mapper.config?.['userinfo_token_claim'] === 'true' ? true : false,
//         map_to_introspection: mapper.config?.['introspection_token_claim'] === 'true' ? true : false,
//       })),
//     })),
// 
//     security: {
//       require_ssl: input.sslRequired as 'none' | 'external' | 'all',
//       enable_user_registration: input.registrationAllowed || false,
//       enable_forgot_password: input.resetPasswordAllowed || false,
//       enable_remember_me: input.rememberMe || false,
//     },
// 
//     password: {
//       require_length: 1,
//       require_lowercase: true,
//       require_uppercase: true,
//       require_numbers: true,
//       history_length: 1,
// 
//       enable_permanent_lockout: input.permanentLockout || false,
//       max_temporary_lockouts: input.maxTemporaryLockouts || 0,
//       failure_factor: input.failureFactor || 5,
//       failure_wait_increment_seconds: input.waitIncrementSeconds || 120,
//       failure_wait_max_seconds: input.maxFailureWaitSeconds || 3600,
//       quick_login_wait_seconds: input.minimumQuickLoginWaitSeconds || 60,
//       quick_login_check_seconds: input.quickLoginCheckMilliSeconds ? Math.round(input.quickLoginCheckMilliSeconds / 1000) : 5,
//       failure_reset_seconds: input.maxDeltaTimeSeconds || 86400,
//     }
//   }
// }
// 
// export async function getRealm(name: string): Promise<Realm> {
//   const realm = await keycloak.realms.findOne({ realm: name });
//   if (!realm) {
//     throw new Error(`Realm not found: ${name}`);
//   }
// 
// 
//   const adapated = await fromKeycloakRealm(realm);
//   return adapated;
// }
// 
// // export async function listRealms(name: string): Promise<Realm[]> {
//   // const realm = await keycloak.realms.find();
//   // if (!realm) {
//     // throw new Error(`Realm not found: ${name}`);
//   // }
// // 
// // 
//   // const adapated = await fromKeycloakRealm(realm);
//   // return adapated;
// // }
// 
// 
// export default {
//   createRealmRequest,
//   createRealmResponse,
// }
