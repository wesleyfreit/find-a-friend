import { Prisma, type Pet } from 'prisma/client';

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByCityAndUF(city: string, uf: string): Promise<Pet[]>;
}
