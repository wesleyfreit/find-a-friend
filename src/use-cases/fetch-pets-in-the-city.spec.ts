import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { FetchPetsInTheCityUseCase } from './fetch-pets-in-the-city';

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsInTheCityUseCase;

describe('Get Pet Profile Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsInTheCityUseCase(petsRepository);

    await petsRepository.create({
      name: faker.person.firstName(),
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

    await petsRepository.create({
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: 'PUPPY',
      ambient: 'BOTH',
      city: 'Cajazeiras',
      energy: 'HIGH',
      orgId: faker.string.uuid(),
      size: 'MEDIUM',
      uf: 'PB',
      independency: 'HIGH',
    });

    await petsRepository.create({
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: 'YOUNG',
      ambient: 'BOTH',
      city: 'Cajazeiras',
      energy: 'LOW',
      orgId: faker.string.uuid(),
      size: 'GIANT',
      uf: 'PB',
      independency: 'LOW',
    });

    await petsRepository.create({
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: 'SENIOR',
      ambient: 'BOTH',
      city: 'Bom Jesus',
      energy: 'LOW',
      orgId: faker.string.uuid(),
      size: 'EXTRA_LARGE',
      uf: 'PB',
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
          city: 'Cajazeiras',
          uf: 'PB',
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
          city: 'Cajazeiras',
          uf: 'PB',
          age: 'PUPPY',
          energy: 'HIGH',
        }),
      ]),
    );
  });
});
