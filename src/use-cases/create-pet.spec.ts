import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './create-pet';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      requirementsRepository,
      mediasRepository,
    );
    sut = new CreatePetUseCase(petsRepository, mediasRepository, requirementsRepository);
  });

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'INDOOR',
      energy: 'MEDIUM',
      independency: 'LOW',
      name: faker.person.firstName(),
      orgId: faker.string.uuid(),
      size: 'MEDIUM',
      medias: ['https://example.com/media1.jpg', 'https://example.com/media2.jpg'],
      requirements: ['food', 'water'],
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
