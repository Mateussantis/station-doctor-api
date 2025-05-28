import type { Doctor } from '@prisma/client';

export interface CreateDoctorDTO {
  id?: string;
  name: string;
  crm: string;
  specialty: string;
}

export interface DoctorInterface {
  create(doctor: CreateDoctorDTO): Promise<Doctor>;
  findMany(): Promise<Doctor[] | []>;
  findById(id: number): Promise<Doctor | null>;
  findByCrm(crm: string): Promise<Doctor | null>;
}
