import { AppError } from '@/shared/errors';
import type { Doctor } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import type { DoctorRepository } from '../../../repositories/doctor-repository';

interface ListDoctorUseCaseResponse {
  doctor: Doctor[];
}

@injectable()
export class ListDoctorUseCase {
  constructor(
    @inject('DoctorInterface')
    private doctorRepository: DoctorRepository,
  ) { }

  async execute(): Promise<ListDoctorUseCaseResponse> {
    const doctor = await this.doctorRepository.findMany();
    return { doctor };
  }
}

