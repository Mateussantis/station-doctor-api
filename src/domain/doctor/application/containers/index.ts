import { container } from 'tsyringe';
import type { DoctorInterface } from '../interfaces/doctor-interface';
import { DoctorRepository } from '../repositories/doctor-repository';

container.registerSingleton<DoctorInterface>(
  'DoctorInterface',
  DoctorRepository,
);