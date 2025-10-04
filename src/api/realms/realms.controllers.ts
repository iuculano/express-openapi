// import { OpenAPIHono } from '@hono/zod-openapi';
// import Routes from './realms.paths';
// import Services from './realms.services';
// import { zodExceptionHook } from '@middleware/error-handler';
// 
// 
// const app = new OpenAPIHono({ defaultHook: zodExceptionHook });
// 
// app.openapi(Routes.getRealm, async (c) => {
//   const params = c.req.valid('param');
//   const result = await Service.getRealm(params.id);
// 
//   return c.json(result, 200);
// });
// 
// app.openapi(Routes.listRealms, async (c) => {
//   const params = c.req.valid('param');
//   const result = await Service.listRealms(params.id);
// 
//   return c.json(result, 200);
// });
// 
// app.openapi(Routes.createRealm, async (c) => {
//   const body = c.req.valid('json');
//   const result = await Services.createRealm(body);
//   return c.json(result, 201);
// });
// 
// // app.openapi(Routes.updateRealm, async (c) => {
// //   const params = c.req.valid('param');
// //   const result = await Service.getLog(params.id);
// // 
// //   return c.json(result, 200);
// // });
// 
// 
// export default app;
