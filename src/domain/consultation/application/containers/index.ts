import { container } from 'tsyringe';
import type { ConsultationInterface } from '../interface/consultation-interface';
import { ConsultationRepository } from '../repositories/consultation-repository';

container.registerSingleton<ConsultationInterface>('ConsultationInterface', ConsultationRepository);
