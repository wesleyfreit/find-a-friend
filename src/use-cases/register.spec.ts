import { faker } from '@faker-js/faker';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error';
import { RegisterUseCase } from './register';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterUseCase(organizationsRepository);
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

  it('should not be able to register a organization with an already registered email', async () => {
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
