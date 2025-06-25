import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetOrganizationProfileUseCase } from './get-organization-profile';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationProfileUseCase;

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationProfileUseCase(organizationsRepository);
  });

  it('should be able to get organization profile', async () => {
    const organizationCreated = await organizationsRepository.create({
      principal: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password: await hash(faker.internet.password(), 6),
    });

    const { organization } = await sut.execute({
      organizationId: organizationCreated.id,
    });

    expect(organization.id).toEqual(expect.any(String));
    expect(organization.principal).toEqual(organizationCreated.principal);
  });

  it('should not be able to get organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
