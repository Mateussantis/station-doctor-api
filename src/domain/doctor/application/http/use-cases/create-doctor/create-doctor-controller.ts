import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDoctorUseCase } from './create-doctor-use-case';

export class CreateDoctorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, crm, specialty } = request.body;

    const createDoctor = container.resolve(CreateDoctorUseCase);

    const { doctor } = await createDoctor.execute({
      name,
      crm,
      specialty,
    });

    return response.status(201).json(doctor);
  }
}
