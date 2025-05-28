import { prisma } from '@/shared/prisma/client';
import type { Doctor, PrismaClient } from '@prisma/client';
import type { CreateDoctorDTO, DoctorInterface } from '../interfaces/doctor-interface';

export class DoctorRepository implements DoctorInterface {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create({ name, crm, specialty }: CreateDoctorDTO): Promise<Doctor> {
    return await this.repository.doctor.create({
      data: {
        name,
        crm,
        specialty
      },
    });
  }

  async findMany(): Promise<Doctor[] | []> {
    return await this.repository.doctor.findMany();
  }

  async findById(id: number): Promise<Doctor | null> {
    return await this.repository.doctor.findUnique({ where: { id } });
  }

  async findByCrm(crm: string): Promise<Doctor | null> {
    return await this.repository.doctor.findUnique({ where: { crm } });
  }
}
