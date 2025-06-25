import { randomUUID } from 'node:crypto';
import { Prisma, type Pet } from 'prisma/client';
import { FilteredPet, FullPet, PetParams, PetsRepository } from '../pets-repository';
import { InMemoryMediasRepository } from './in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository';
import { InMemoryRequirementsRepository } from './in-memory-requirements-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(
    private organizationsRepository: InMemoryOrganizationsRepository,
    private requirementsRepository: InMemoryRequirementsRepository,
    private mediasRepository: InMemoryMediasRepository,
  ) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      ambient: data.ambient,
      energy: data.energy,
      orgId: data.orgId,
      size: data.size,
      independency: data.independency,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<FullPet | null> {
    const pet = this.items.find((pet) => pet.id === id);
    const organization = this.organizationsRepository.items.find(
      (organization) => organization.id === pet?.orgId,
    );

    if (!pet || !organization) {
      return null;
    }

    return {
      ...pet,
      organization,
      requirements: this.requirementsRepository.items.filter(
        (requirement) => requirement.petId === pet.id,
      ),
      medias: this.mediasRepository.items.filter((media) => media.petId === pet.id),
    };
  }

  async findManyByCityAndUF(
    city: string,
    uf: string,
    params?: PetParams,
  ): Promise<FilteredPet[]> {
    const organizations = this.organizationsRepository.items.filter((organization) => {
      return (
        organization.city.toLowerCase() === city.toLowerCase() &&
        organization.state.toLowerCase() === uf.toLowerCase()
      );
    });

    const pets = this.items.filter((pet) => {
      return organizations.some((organization) => organization.id === pet.orgId);
    });

    if (Object.keys(params ?? {}).length > 0) {
      return pets
        .filter((pet) => {
          if (params?.age && pet.age !== params.age) return false;
          if (params?.energy && pet.energy !== params.energy) return false;
          if (params?.size && pet.size !== params.size) return false;
          if (params?.ambient && pet.ambient !== params.ambient) return false;
          if (params?.independency && pet.independency !== params.independency) {
            return false;
          }

          return true;
        })
        .map((pet) => ({
          id: pet.id,
          name: pet.name,
          medias: this.mediasRepository.items.filter((media) => media.petId === pet.id),
        }));
    }

    return pets.map((pet) => {
      return {
        id: pet.id,
        name: pet.name,
        medias: this.mediasRepository.items.filter((media) => media.petId === pet.id),
      };
    });
  }
}
