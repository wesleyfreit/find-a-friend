import { MediasRepository } from '@/repositories/medias-repository';

import { RequirementsRepository } from '@/repositories/requirements-repository';
import {
  PetAge,
  PetAmbient,
  PetEnergy,
  PetIndependency,
  PetSize,
  type Pet,
} from 'prisma/client';
import { PetsRepository } from '../repositories/pets-repository';

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: PetAge;
  ambient: PetAmbient;
  energy: PetEnergy;
  size: PetSize;
  uf: string;
  city: string;
  independency: PetIndependency;
  orgId: string;
  medias?: string[];
  requirements?: string[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private mediasRepository: MediasRepository,
    private requirementsRepository: RequirementsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    ambient,
    energy,
    size,
    uf,
    city,
    independency,
    orgId,
    medias,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      ambient,
      energy,
      size,
      uf,
      city,
      independency,
      orgId,
    });

    if (medias && medias.length > 0) {
      await this.mediasRepository.createMany(medias, pet.id);
    }

    if (requirements && requirements.length > 0) {
      await this.requirementsRepository.createMany(requirements, pet.id);
    }

    return { pet };
  }
}
