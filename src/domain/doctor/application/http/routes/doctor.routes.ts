import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import { CreateDoctorController } from '../use-cases/create-doctor/create-doctor-controller';
import { ListDoctorController } from '../use-cases/list-doctor/list-doctor-controller';

const doctorRouter = Router();

const createDoctorController = new CreateDoctorController();
const listDoctorController = new ListDoctorController();

doctorRouter.get('/', listDoctorController.handle.bind(listDoctorController));

doctorRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      crm: Joi.string().required(),
      specialty: Joi.string().required(),
    }),
  }),
  createDoctorController.handle.bind(createDoctorController),
);

export { doctorRouter };
