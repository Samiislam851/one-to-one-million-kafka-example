import { Router } from 'express';
import { healthCheck } from './health.service';

const healthRouter = Router();

healthRouter.get('/', healthCheck);

export default healthRouter;
