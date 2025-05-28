import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './create-client-use-case';

export class CreateClientController {
  public async handle(request: Request, response: Response): Promise<void> {
    console.log("okkk")
    const { name, cpf, birth } = request.body;

    const createClient = container.resolve(CreateClientUseCase);

    const { client } = await createClient.execute({
      name,
      cpf,
      birth,
    });

    response.status(201).json(client);
  }
}
