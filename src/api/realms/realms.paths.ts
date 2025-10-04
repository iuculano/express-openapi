// import { createRoute } from '@hono/zod-openapi';
// import Schemas from './realms.schemas';
// import ErrorSchemas from '@lib/errors'
// 
// 
// const getRealm = createRoute({
//   method: 'get' as const,
//   path: '/realms/:id',
//   request: {
//     params: Schemas.getRealmRequest,
//   },
//   responses: {
//     200: {
//       description: 'Realm retrieved successfully',
//       content: {
//         'application/json': {
//           schema: Schemas.getRealmResponse,
//         },
//       },
//     },
//     404: {
//       description: 'Realm not found',
//       content: {
//         'application/json': {
//           schema: ErrorSchemas.httpError,
//         },
//       },
//     },
//   },
// });
// 
// const createRealm = createRoute({
//   method: 'post' as const,
//   path: '/realms',
//   request: {
//     body: {
//       required: true,
//       content: {
//         'application/json': {
//           schema: Schemas.createRealmRequest,
//         },
//       },
//     }
//   },
//   responses: {
//     201: {
//       description: 'Realm created successfully',
//       content: {
//         'application/json': {
//           schema: Schemas.createRealmResponse,
//         },
//       },
//     },
//     500: {
//       description: 'Internal error creating realm',
//       content: {
//         'application/json': {
//           schema: ErrorSchemas.httpError,
//         },
//       },
//     },
//   },
// });
// 
// export default {
//   createRealm,
// }
