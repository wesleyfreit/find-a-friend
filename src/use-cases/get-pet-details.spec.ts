import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetPetDetailsUseCase } from './get-pet-details';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let sut: GetPetDetailsUseCase;

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    petsRepository = new InMemoryPetsRepository(requirementsRepository, mediasRepository);
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it('should be able to get the pet details', async () => {
    const petId = faker.string.uuid();

    await petsRepository.create({
      id: petId,
      name: 'Bobby',
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'INDOOR',
      city: 'Cajazeiras',
      energy: 'HIGH',
      orgId: faker.string.uuid(),
      size: 'SMALL',
      uf: 'PB',
      independency: 'LOW',
    });

    const { pet } = await sut.execute({
      petId: petId,
    });

    expect(pet.id).toEqual(petId);
    expect(pet.city).toEqual('Cajazeiras');
    expect(pet.energy).toEqual('HIGH');
  });

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
