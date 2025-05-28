import { Router } from 'express';
import { doctorRouter } from './doctor.routes';

const doctorsRouter = Router();

doctorsRouter.use('/doctor', doctorRouter);

export { doctorsRouter };
