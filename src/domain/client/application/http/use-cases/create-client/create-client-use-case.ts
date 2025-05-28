import { AppError } from '@/shared/errors';
import type { Client } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import type { ClientInterface } from '../../../interfaces/client-interface';

interface CreateClientUseCaseRequest {
  name: string;
  cpf: string;
  birth: Date;
}

interface CreateClientUseCaseResponse {
  client: Client;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientInterface')
    private clientRepository: ClientInterface,
  ) { }

  async execute({
    name,
    cpf,
    birth,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const newClient = await this.clientRepository.findByCpf(cpf);

    if (newClient) {
      throw new AppError("Este CPF já foi cadastrado.")
    }

    const client = await this.clientRepository.create({
      name,
      cpf,
      birth
    });

    return { client };
  }
}
