import { Router } from 'express';
import { clientRouter } from './client.routes';

const clientsRouter = Router();

clientsRouter.use('/client', clientRouter);

export { clientsRouter };
