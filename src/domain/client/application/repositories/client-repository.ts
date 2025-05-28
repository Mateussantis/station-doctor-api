import { prisma } from '@/shared/prisma/client';
import type { Client, PrismaClient } from '@prisma/client';
import type { ClientInterface, CreateClientDTO } from '../interfaces/client-interface';

export class ClientRepository implements ClientInterface {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create({ name, cpf, birth }: CreateClientDTO): Promise<Client> {
    return await this.repository.client.create({
      data: {
        name,
        cpf,
        birth
      },
    });
  }

  async delete(client: Client): Promise<void> {
    await this.repository.client.delete({
      where: {
        id: client.id,
      },
    });
  }

  async findById(clientId: number): Promise<Client | null> {
    return await this.repository.client.findUnique({ where: { id: clientId } });
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    return await this.repository.client.findUnique({ where: { cpf } });
  }

}
