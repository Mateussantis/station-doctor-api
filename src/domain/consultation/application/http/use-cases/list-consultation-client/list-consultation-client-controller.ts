import type { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { container } from 'tsyringe';
import { ListConsultationClientUseCase } from './list-consultation-client-use-case';

export class ListConsultationClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.params;

    const listConsultationUseCase = container.resolve(ListConsultationClientUseCase);

    const { consultation } = await listConsultationUseCase.execute({
      clientId: Number(clientId)
    })

    const consultationFormatted = consultation.map((consultation) => {
      return {
        ...consultation,
        date: DateTime.fromJSDate(consultation.date).toFormat('dd/MM/yyyy')
      }
    })

    return response.status(200).json({ consultationFormatted });
  }
}
