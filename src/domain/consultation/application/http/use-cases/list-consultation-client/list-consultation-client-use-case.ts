import type { ClientRepository } from '@/domain/client/application/repositories/client-repository';
import { AppError } from '@/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import type { ConsultationInterface } from '../../../interface/consultation-interface';

interface CreateConsultationRequest {
  clientId: number;
}

@injectable()
export class ListConsultationClientUseCase {
  constructor(
    @inject('ConsultationInterface')
    private consultationRepository: ConsultationInterface,
    @inject('ClientInterface')
    private clientRepository: ClientRepository
  ) { }

  async execute({ clientId }: CreateConsultationRequest) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) throw new AppError('Cliente não encontrado');

    const consultation = await this.consultationRepository.listConsultationFromClientId(clientId);

    return { consultation };
  }
}
