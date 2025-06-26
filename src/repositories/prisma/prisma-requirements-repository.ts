import { prisma } from '@/lib/prisma';
import { RequirementsRepository } from '../requirements-repository';

export class PrismaRequirementsRepository implements RequirementsRepository {
  async createMany(requirement: string[], petId: string): Promise<void> {
    await prisma.requirement.createMany({
      data: requirement.map((name) => ({
        name,
        petId,
      })),
    });
  }
}
