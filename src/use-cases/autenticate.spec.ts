import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it('should be able to authenticate', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await organizationsRepository.create({
      principal: faker.person.fullName(),
      email,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      password: await hash(password, 6),
    });

    const { organization } = await sut.execute({
      email,
      password,
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = faker.internet.email();

    await organizationsRepository.create({
      principal: faker.person.fullName(),
      email,
      password: await hash(faker.internet.password(), 6),
      phone: faker.phone.number(),
      city: faker.location.city(),
      state: faker.location.state(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

    await expect(() =>
      sut.execute({
        email,
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
