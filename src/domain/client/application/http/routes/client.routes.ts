import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import { CreateClientController } from '../use-cases/create-client/create-client-controller';

const clientRouter = Router();

const createClientController = new CreateClientController();

clientRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.string().required(),
    }),
  }),
  createClientController.handle,
);

export { clientRouter };