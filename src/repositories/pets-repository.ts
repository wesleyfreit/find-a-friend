import { Optional } from '@/types/optional';
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
  org: Optional<Organization, 'password'>;
  requirements?: Requirement[];
  medias?: Media[];
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<FullPet | null>;
  findPetOrg(petId: string): Promise<Optional<Organization, 'password'> | null>;
  findManyByCityAndUF(
    city: string,
    uf: string,
    params?: PetParams,
  ): Promise<FilteredPet[]>;
}
