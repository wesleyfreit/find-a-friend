import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './create-pet';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    sut = new CreatePetUseCase(petsRepository, mediasRepository, requirementsRepository);
  });

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'INDOOR',
      city: faker.location.city(),
      energy: 'MEDIUM',
      independency: 'LOW',
      name: faker.person.firstName(),
      orgId: faker.string.uuid(),
      size: 'MEDIUM',
      uf: faker.location.state(),
      medias: ['https://example.com/media1.jpg', 'https://example.com/media2.jpg'],
      requirements: ['food', 'water'],
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
