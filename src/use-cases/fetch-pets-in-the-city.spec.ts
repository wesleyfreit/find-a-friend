import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { FetchPetsInTheCityUseCase } from './fetch-pets-in-the-city';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: FetchPetsInTheCityUseCase;

describe('Fetch Pets In The City Use Case', () => {
  beforeEach(async () => {
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      requirementsRepository,
      mediasRepository,
    );
    sut = new FetchPetsInTheCityUseCase(petsRepository);

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
      name: 'Bobby',
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'INDOOR',
      energy: 'HIGH',
      orgId: 'org-1',
      size: 'SMALL',
      independency: 'LOW',
    });

    await petsRepository.create({
      name: 'Max',
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'BOTH',
      energy: 'HIGH',
      orgId: 'org-1',
      size: 'MEDIUM',
      independency: 'HIGH',
    });

    await petsRepository.create({
      name: 'Charlie',
      about: faker.lorem.paragraph(),
      age: 'YOUNG',
      ambient: 'BOTH',
      energy: 'LOW',
      orgId: 'org-1',
      size: 'GIANT',
      independency: 'LOW',
    });

    await petsRepository.create({
      name: 'Bella',
      about: faker.lorem.paragraph(),
      age: 'SENIOR',
      ambient: 'BOTH',
      energy: 'LOW',
      orgId: faker.string.uuid(),
      size: 'EXTRA_LARGE',
      independency: 'LOW',
    });
  });

  it('should be able to fetch pets in the city', async () => {
    const { pets } = await sut.execute({
      city: 'Cajazeiras',
      uf: 'PB',
    });

    expect(pets).toHaveLength(3);

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Bobby',
        }),
        expect.objectContaining({
          name: 'Max',
        }),
        expect.objectContaining({
          name: 'Charlie',
        }),
      ]),
    );
  });

  it('should be able to fetch pets in the city with some filters', async () => {
    const { pets } = await sut.execute({
      city: 'Cajazeiras',
      uf: 'PB',
      params: {
        age: 'PUPPY',
        energy: 'HIGH',
      },
    });

    expect(pets).toHaveLength(2);

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Bobby',
        }),
        expect.objectContaining({
          name: 'Max',
        }),
      ]),
    );
  });
});
