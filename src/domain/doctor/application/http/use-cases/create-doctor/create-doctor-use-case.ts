import { AppError } from '@/shared/errors/AppError';
import type { Doctor } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import type { DoctorInterface } from '../../../interfaces/doctor-interface';

interface CreateDoctorUseCaseRequest {
  name: string;
  crm: string;
  specialty: string;
}

interface CreateDoctorUseCaseResponse {
  doctor: Doctor;
}

@injectable()
export class CreateDoctorUseCase {
  constructor(
    @inject('DoctorInterface')
    private doctorRepository: DoctorInterface,
  ) { }

  async execute({
    name,
    crm,
    specialty,
  }: CreateDoctorUseCaseRequest): Promise<CreateDoctorUseCaseResponse> {
    const newClient = await this.doctorRepository.findByCrm(crm);

    if (newClient) {
      throw new AppError("Este CRM já foi cadastrado.");
    }

    const doctor = await this.doctorRepository.create({
      name,
      crm,
      specialty
    });

    return { doctor };
  }
}
