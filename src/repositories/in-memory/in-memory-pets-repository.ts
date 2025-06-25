import { randomUUID } from 'node:crypto';
import { Prisma, type Pet } from 'prisma/client';
import { PetsRepository } from '../pets-repository';

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

  async findByCityAndUF(city: string, uf: string): Promise<Pet[]> {
    const pets = this.items.filter(
      (pet) =>
        pet.city.toLocaleLowerCase() === city.toLocaleLowerCase() &&
        pet.uf.toLocaleLowerCase() === uf.toLocaleLowerCase(),
    );

    return pets;
  }
}
