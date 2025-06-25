import { randomUUID } from 'node:crypto';
import { Prisma, type Pet } from 'prisma/client';
import { PetParams, PetsRepository } from '../pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

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

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findManyByCityAndUF(
    city: string,
    uf: string,
    params?: PetParams,
  ): Promise<Pet[]> {
    const pets = this.items.filter(
      (pet) =>
        pet.city.toLocaleLowerCase() === city.toLocaleLowerCase() &&
        pet.uf.toLocaleLowerCase() === uf.toLocaleLowerCase(),
    );

    if (Object.keys(params ?? {}).length > 0) {
      return pets.filter((pet) => {
        if (params?.size && pet.size !== params.size) {
          return false;
        }
        if (params?.age && pet.age !== params.age) {
          return false;
        }
        if (params?.energy && pet.energy !== params.energy) {
          return false;
        }
        if (params?.ambient && pet.ambient !== params.ambient) {
          return false;
        }
        if (params?.independency && pet.independency !== params.independency) {
          return false;
        }
        return true;
      });
    }

    return pets;
  }
}
