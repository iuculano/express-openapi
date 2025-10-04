import express from 'express';
import Services from './health.services.js';
import { HttpException } from '../../lib/errors.js';
const router = express.Router();
router.get('/livez', async (req, res) => {
    throw new HttpException(418);
    res.json({
        status: 'alive',
    });
});
router.get('/healthz', async (req, res) => {
    res.json({
        status: 'ok',
    });
});
router.get('/readyz', async (req, res) => {
    const checks = {
        keycloak: await Services.checkKeycloak(),
    };
    const allHealthy = Object.values(checks).every(Boolean);
    return res.status(allHealthy ? 200 : 503).json({
        status: allHealthy ? 'ok' : 'degraded',
        checks,
    });
});
export default router;
//# sourceMappingURL=health.controllers.js.map