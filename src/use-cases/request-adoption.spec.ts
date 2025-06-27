import { InMemoryMediasRepository } from '@/repositories/in-memory/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository';
import { faker } from '@faker-js/faker';
import { RequestAdoptionUseCase } from './request-adoption';

let petsRepository: InMemoryPetsRepository;
let mediasRepository: InMemoryMediasRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RequestAdoptionUseCase;

describe('Request Adoption Use Case', () => {
  beforeEach(() => {
    mediasRepository = new InMemoryMediasRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      requirementsRepository,
      mediasRepository,
    );
    sut = new RequestAdoptionUseCase(petsRepository);
  });

  it('should be able to request a pet adoption contacting the org', async () => {
    const petId = faker.string.uuid();

    await organizationsRepository.create({
      id: 'org-1',
      principal: 'John Doe',
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: '+55 83 99999-9999',
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

    const org = await sut.execute({
      petId: petId,
    });

    expect(org.organizationPrincipal).toEqual('John Doe');
    expect(org.whatsappNumber).toEqual('+55 83 99999-9999');
  });
});
