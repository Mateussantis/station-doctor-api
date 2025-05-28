import { Router } from 'express';
import { CreateConsultationController } from '../use-cases/create-consultation/create-consultation-controller';
import { ListConsultationClientController } from '../use-cases/list-consultation-client/list-consultation-client-controller';
import { ListConsultationDoctorController } from '../use-cases/list-consultation-doctor/list-consultation-doctor-controller';

const consultationRouter = Router();

const createConsultationController = new CreateConsultationController();
const listConsultationDoctorController = new ListConsultationDoctorController();
const listConsultationClientController = new ListConsultationClientController();

consultationRouter.post('/', createConsultationController.handle.bind(createConsultationController));
consultationRouter.get('/doctor/:doctorId', listConsultationDoctorController.handle.bind(listConsultationDoctorController));
consultationRouter.get('/client/:clientId', listConsultationClientController.handle.bind(listConsultationClientController));

export { consultationRouter };
