// import { keycloak } from '@lib/keycloak';
// 
// import type { CreateRealmRequest, CreateRealmResponse } from './realms.schemas';
// 
// 
// 
// /**
//  * Retrieves a single realm by its name.
//  *
//  * @param name
//  * The name of the realm to retrieve.
//  *
//  * @returns
//  * A promise that resolves to the realm data.
//  *
//  * @throws {HTTPException}
//  * 404 - If the realm is not found.
//  */
// async function getRealm(name: string) {
//   const result = await keycloak.realms.findOne({ realm: name });
// 
//   if (!result) {
//     throw new HTTPException(404);
//   }
// 
//   return result;
// }
// 
// 
// /**
//  * Simplified function to create a realm in Keycloak.
//  *
//  * This deliberately does not expose every single possible configuration option.
//  * Instead, it's expected to deal with a small subset of opinionated defaults.
//  *
//  * @returns
//  * A promise that resolves to `true` if the database is reachable, otherwise
//  * `false`.
//  */
// async function createRealm(request: CreateRealmRequest): Promise<CreateRealmResponse> {
//   const result = await keycloak.realms.create({
//     enabled: true,
// 
//     realm: request.metadata.name,
//     displayName: request.metadata.displayName,
// 
// 
//   });
// 
//   if (!result) {
//     throw new HTTPException(500, { message: 'Failed to create realm'  });
//   }
// 
//   // The create call doesn't return a RealmRepresentation, and we might want
//   // some additional data from it, so we fetch it after creating.
// 
//   return {} as CreateRealmResponse
// }
// 
// export default {
//   getRealm,
//   createRealm,
// }
