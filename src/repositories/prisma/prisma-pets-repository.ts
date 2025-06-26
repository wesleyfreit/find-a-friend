import { prisma } from '@/lib/prisma';
import { Pet, Prisma } from 'prisma/client';
import { FilteredPet, FullPet, PetParams, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string): Promise<FullPet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        org: true,
        requirements: true,
        medias: true,
      },
    });

    return pet;
  }

  async findManyByCityAndUF(
    city: string,
    uf: string,
    params?: PetParams,
  ): Promise<FilteredPet[]> {
    const where: Prisma.PetWhereInput = {
      org: {
        city: {
          equals: city,
          mode: 'insensitive',
        },
        state: {
          equals: uf,
          mode: 'insensitive',
        },
      },
    };

    if (params) {
      if (params?.age) {
        where.age = params.age;
      }
      if (params?.energy) {
        where.energy = params.energy;
      }
      if (params?.size) {
        where.size = params.size;
      }
      if (params?.independency) {
        where.independency = params.independency;
      }
      if (params?.ambient) {
        where.ambient = params.ambient;
      }
    }

    const pets = await prisma.pet.findMany({
      where,
      select: {
        id: true,
        name: true,
        medias: true,
      },
    });

    return pets;
  }
}
