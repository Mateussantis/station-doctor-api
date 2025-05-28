import type { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { container } from 'tsyringe';
import { ListConsultationDoctorUseCase } from './list-consultation-doctor-use-case';

export class ListConsultationDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { doctorId } = request.params;

    const listConsultationUseCase = container.resolve(ListConsultationDoctorUseCase);

    const { consultation } = await listConsultationUseCase.execute({
      doctorId: Number(doctorId)
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
