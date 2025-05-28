import { Router } from 'express';
import { consultationRouter } from './consultation.routes';

const consultationsRouter = Router();

consultationsRouter.use('/consultation', consultationRouter);

export { consultationsRouter };
