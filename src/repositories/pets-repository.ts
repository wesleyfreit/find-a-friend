import {
  PetAge,
  PetAmbient,
  PetEnergy,
  PetIndependency,
  PetSize,
  Prisma,
  type Pet,
} from 'prisma/client';

export interface PetParams {
  age?: PetAge;
  energy?: PetEnergy;
  size?: PetSize;
  independency?: PetIndependency;
  ambient?: PetAmbient;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCityAndUF(city: string, uf: string, params?: PetParams): Promise<Pet[]>;
}
