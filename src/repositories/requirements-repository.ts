import { Requirement } from 'prisma/client';

export interface RequirementsRepository {
  createMany(data: string[], petId: string): Promise<Requirement[]>;
}
