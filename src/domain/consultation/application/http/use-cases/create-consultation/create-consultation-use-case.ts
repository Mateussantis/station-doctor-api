import type { DoctorRepository } from '@/domain/doctor/application/repositories/doctor-repository';
import { AppError } from '@/shared/errors/AppError';
import { prisma } from '@/shared/prisma/client';
import { DateTime } from 'luxon';
import { inject, injectable } from 'tsyringe';
import type { ConsultationInterface } from '../../../interface/consultation-interface';

interface CreateConsultationRequest {
  clientId: number;
  doctorId: number;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
}

@injectable()
export class CreateConsultationUseCase {
  constructor(
    @inject('ConsultationInterface')
    private consultationRepository: ConsultationInterface,
    @inject('DoctorInterface')
    private doctorRepository: DoctorRepository
  ) { }

  async execute({ clientId, doctorId, date, time }: CreateConsultationRequest) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new AppError('Médico não encontrado');

    const duration = doctor.defaultAppointmentDuration; // duração em minutos
    const timeZone = 'America/Sao_Paulo';

    // Cria DateTime local para início da consulta
    const startDateTimeLocal = DateTime.fromISO(`${date}T${time}`, { zone: timeZone });
    if (!startDateTimeLocal.isValid) {
      console.error('Erro de parsing:', startDateTimeLocal.invalidExplanation);
      throw new AppError('Data ou hora inválida fornecida');
    }

    // Data final da consulta somando a duração
    const endDateTimeLocal = startDateTimeLocal.plus({ minutes: duration });

    // Verifica se o horário está dentro do expediente
    const [startHour, startMinute] = doctor.workStartTime.split(':').map(Number);
    const [endHour, endMinute] = doctor.workEndTime.split(':').map(Number);

    const workStart = startDateTimeLocal.set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });
    const workEnd = startDateTimeLocal.set({ hour: endHour, minute: endMinute, second: 0, millisecond: 0 });

    if (startDateTimeLocal < workStart || endDateTimeLocal > workEnd) {
      throw new AppError('Horário fora do expediente do médico');
    }

    // Obtém todas as consultas do médico no mesmo dia
    // Usa startOf('day') para pegar só o dia correto
    const dayStart = startDateTimeLocal.startOf('day').toJSDate();
    const dayEnd = startDateTimeLocal.endOf('day').toJSDate();

    const consultations = await prisma.consultations.findMany({
      where: {
        doctorId,
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    // Verifica conflitos de horário considerando duração
    for (const c of consultations) {
      const cStart = DateTime.fromJSDate(c.date, { zone: timeZone }).set({
        hour: Number(c.time.split(':')[0]),
        minute: Number(c.time.split(':')[1]),
      });

      const cEnd = cStart.plus({ minutes: c.durationMinutes });

      // Checa se os intervalos se sobrepõem
      const overlap = startDateTimeLocal < cEnd && endDateTimeLocal > cStart;

      if (overlap) {
        throw new AppError('Este horário já está reservado');
      }
    }

    // Cria a consulta
    const consultation = await this.consultationRepository.create({
      clientId,
      doctorId,
      date: startDateTimeLocal.startOf('day').toJSDate(),
      time,
      durationMinutes: duration,
    });

    return { consultation };
  }
}
