import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetPetDetailsUseCase } from './get-pet-details';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetPetDetailsUseCase;

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      requirementsRepository,
      mediasRepository,
    );
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it('should be able to get the pet details', async () => {
    const petId = faker.string.uuid();

    await organizationsRepository.create({
      id: 'org-1',
      principal: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      city: 'Cajazeiras',
      state: 'PB',
      address: faker.location.streetAddress(),
      cep: '58900-000',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

    await petsRepository.create({
      id: petId,
      name: 'Bobby',
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'INDOOR',
      energy: 'HIGH',
      orgId: 'org-1',
      size: 'SMALL',
      independency: 'LOW',
    });

    const { pet } = await sut.execute({
      petId: petId,
    });

    expect(pet.id).toEqual(petId);
    expect(pet.name).toEqual('Bobby');
    expect(pet.energy).toEqual('HIGH');
    expect(pet.org.cep).toEqual('58900-000');
  });

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
