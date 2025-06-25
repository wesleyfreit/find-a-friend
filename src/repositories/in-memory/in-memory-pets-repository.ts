import { randomUUID } from 'node:crypto';
import { Prisma, type Pet } from 'prisma/client';
import { FilteredPet, FullPet, PetParams, PetsRepository } from '../pets-repository';
import { InMemoryMediasRepository } from './in-memory-medias-repository';
import { InMemoryRequirementsRepository } from './in-memory-requirements-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(
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
      city: data.city,
      energy: data.energy,
      orgId: data.orgId,
      size: data.size,
      uf: data.uf,
      independency: data.independency,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<FullPet | null> {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return {
      ...pet,
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
    const pets = this.items.filter(
      (pet) =>
        pet.city.toLocaleLowerCase() === city.toLocaleLowerCase() &&
        pet.uf.toLocaleLowerCase() === uf.toLocaleLowerCase(),
    );

    if (Object.keys(params ?? {}).length > 0) {
      // Filter by all params in the params object and return only pets that match all criteria and with medias and only with id and name
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
