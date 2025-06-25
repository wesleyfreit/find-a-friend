import { faker } from '@faker-js/faker';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error';
import { RegisterOrganizationUseCase } from './register-organization';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterOrganizationUseCase(organizationsRepository);
  });

  it('should be able to register a new organization', async () => {
    const { organization } = await sut.execute({
      principal: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password: faker.internet.password(),
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should hash organization password upon registration', async () => {
    const password = faker.internet.password();

    const { organization } = await sut.execute({
      principal: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password,
    });

    const isPasswordCorrectlyHashed = await compare(password, organization.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to registerorganization a organization with an already registerorganizationed email', async () => {
    const email = faker.internet.email();

    await sut.execute({
      principal: faker.person.fullName(),
      email,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password: faker.internet.password(),
    });

    await expect(() =>
      sut.execute({
        principal: faker.person.fullName(),
        email,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });
});
