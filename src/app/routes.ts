import { Router } from 'express';
import healthRouter from '../modules/health/health.routes';
import { eventCountV1Router } from '../modules/EventCount_V1/eventCountV1.routes';

const router = Router();

router.use('/health', healthRouter);

router.use('/api/v1/events',eventCountV1Router);

export default router;
