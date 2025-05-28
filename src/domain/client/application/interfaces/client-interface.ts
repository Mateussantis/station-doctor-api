import type { Client } from '@prisma/client';

export interface CreateClientDTO {
  id?: string;
  name: string;
  cpf: string;
  birth: Date;
}

export interface ClientInterface {
  create(client: CreateClientDTO): Promise<Client>;
  delete(client: Client): Promise<void>;
  findById(clientId: number): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
}
