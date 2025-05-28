import { container } from 'tsyringe';
import type { ClientInterface } from '../interfaces/client-interface';
import { ClientRepository } from '../repositories/client-repository';

container.registerSingleton<ClientInterface>(
  'ClientInterface',
  ClientRepository,
);