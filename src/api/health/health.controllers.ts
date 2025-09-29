import express from 'express';
import Services from './health.services';


const router = express.Router();

router.get('/livez', async (req, res) => {
  res.json({
    status: 'alive' as const,
  });
});

router.get('/healthz', async (req, res) => {
  res.json({
    status: 'ok' as const,
  });
});

router.get('/readyz', async (req, res) => {
  const checks = {
    keycloak: await Services.checkKeycloak(),
  };

  const allHealthy = Object.values(checks).every(Boolean);

  return res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ok' as const : 'degraded' as const,
    checks,
  });
});

export default router;
