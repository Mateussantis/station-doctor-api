import { prisma } from '@/shared/prisma/client';
import type { Consultations } from '@prisma/client';
import type { ConsultationInterface, CreateConsultationDTO, ListConsultationClientDTO, ListConsultationDoctorDTO } from '../interface/consultation-interface';

export class ConsultationRepository implements ConsultationInterface {
  async create(data: CreateConsultationDTO): Promise<Consultations> {
    return prisma.consultations.create({ data });
  }

  async findByDoctorDateTime(doctorId: number, date: Date, time: string): Promise<Consultations | null> {
    return prisma.consultations.findFirst({
      where: {
        doctorId,
        date,
        time,
      },
    });
  }

  async listConsultationFromDoctorId(doctorId: number): Promise<ListConsultationDoctorDTO[] | []> {
    return await prisma.consultations.findMany(
      {
        where: { doctorId },
        select: {
          client: {
            select: {
              name: true,
              id: false,
              consultations: false,
              birth: false,
              cpf: false
            }
          },
          date: true,
          time: true,
          clientId: false,
          doctor: false,
          doctorId: false,
          durationMinutes: false,
          id: false,
        }
      });
  }

  async listConsultationFromClientId(clientId: number): Promise<ListConsultationClientDTO[] | []> {
    return await prisma.consultations.findMany(
      {
        where: { clientId },
        select: {
          doctor: {
            select: {
              name: true,
              specialty: true,
              crm: false,
              id: false,
              defaultAppointmentDuration: false,
              workEndTime: false,
              workStartTime: false
            }
          },
          date: true,
          time: true,
          clientId: false,
          client: false,
          doctorId: false,
          durationMinutes: false,
          id: false,
        }
      });
  }
}
