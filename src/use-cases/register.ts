import bcrypt from 'bcryptjs';
import { type Organization } from 'prisma/client';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error';

interface RegisterUseCaseRequest {
  principal: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  cep: string;
  latitude: number;
  longitude: number;
}

interface RegisterUseCaseResponse {
  organization: Organization;
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    principal,
    email,
    phone,
    password,
    address,
    cep,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email);

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      principal,
      email,
      phone,
      password: password_hash,
      address,
      cep,
      latitude,
      longitude,
    });

    return { organization };
  }
}
