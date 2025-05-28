import type { Consultations } from '@prisma/client';

export interface CreateConsultationDTO {
  clientId: number;
  doctorId: number;
  date: Date;
  time: string;
  durationMinutes: number;
}

export interface ListConsultationDoctorDTO {
  date: Date;
  time: string;
  client: {
    name: string;
  };
}

export interface ListConsultationClientDTO {
  date: Date;
  time: string;
  doctor: {
    name: string;
    specialty: string;
  };
}

export interface ConsultationInterface {
  create(data: CreateConsultationDTO): Promise<Consultations>;
  findByDoctorDateTime(doctorId: number, date: Date, time: string): Promise<Consultations | null>;
  listConsultationFromDoctorId(doctorId: number): Promise<ListConsultationDoctorDTO[] | []>;
  listConsultationFromClientId(clientId: number): Promise<ListConsultationClientDTO[] | []>;
}
