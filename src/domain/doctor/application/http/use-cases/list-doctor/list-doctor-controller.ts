import type { Response } from 'express';
import { container } from 'tsyringe';
import { ListDoctorUseCase } from './list-doctor-use-case';

export class ListDoctorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listDoctorUseCase = container.resolve(
      ListDoctorUseCase,
    );

    const { doctor } = await listDoctorUseCase.execute();

    return response.status(200).json({ doctor });
  }
}
