import { clientsRouter } from '@/domain/client/application/http/routes';
import { consultationsRouter } from '@/domain/consultation/application/http/routes';
import { doctorsRouter } from '@/domain/doctor/application/http/routes';
import { Router } from 'express';

const routes = Router();

routes.use('/', clientsRouter);
routes.use('/', doctorsRouter)
routes.use('/', consultationsRouter)

export { routes };
