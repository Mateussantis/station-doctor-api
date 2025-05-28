import type { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { container } from 'tsyringe';
import { CreateConsultationUseCase } from './create-consultation-use-case';

export class CreateConsultationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId, doctorId, date, time } = request.body;

    const createConsultationUseCase = container.resolve(CreateConsultationUseCase);

    const { consultation } = await createConsultationUseCase.execute({
      clientId,
      doctorId,
      date,
      time,
    });

    return response.status(201).json(consultation);
  }
}
