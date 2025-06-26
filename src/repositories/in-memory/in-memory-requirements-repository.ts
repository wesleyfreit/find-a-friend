import { randomUUID } from 'node:crypto';
import { Requirement } from 'prisma/client';
import { RequirementsRepository } from '../requirements-repository';

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public items: Requirement[] = [];

  async createMany(data: string[], petId: string): Promise<void> {
    data.map((name) => {
      const requirement: Requirement = {
        id: randomUUID(),
        name,
        petId,
        createdAt: new Date(),
      };

      this.items.push(requirement);
    });
  }
}
