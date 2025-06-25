import {
  Media,
  Organization,
  PetAge,
  PetAmbient,
  PetEnergy,
  PetIndependency,
  PetSize,
  Prisma,
  Requirement,
  type Pet,
} from 'prisma/client';

export interface PetParams {
  age?: PetAge;
  energy?: PetEnergy;
  size?: PetSize;
  independency?: PetIndependency;
  ambient?: PetAmbient;
}

export interface FilteredPet {
  id: string;
  name: string;
  medias: Media[];
}

export interface FullPet extends Pet {
  organization: Organization;
  requirements?: Requirement[];
  medias?: Media[];
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<FullPet | null>;
  findManyByCityAndUF(
    city: string,
    uf: string,
    params?: PetParams,
  ): Promise<FilteredPet[]>;
}
