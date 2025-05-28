import type { DoctorRepository } from '@/domain/doctor/application/repositories/doctor-repository';
import { AppError } from '@/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import type { ConsultationInterface } from '../../../interface/consultation-interface';

interface CreateConsultationRequest {
  doctorId: number;
}

@injectable()
export class ListConsultationDoctorUseCase {
  constructor(
    @inject('ConsultationInterface')
    private consultationRepository: ConsultationInterface,
    @inject('DoctorInterface')
    private doctorRepository: DoctorRepository
  ) { }

  async execute({ doctorId }: CreateConsultationRequest) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new AppError('Médico não encontrado');

    const consultation = await this.consultationRepository.listConsultationFromDoctorId(doctorId);

    return { consultation };
  }
}
