import { randomUUID } from 'node:crypto';
import { Prisma, type Organization } from 'prisma/client';
import { OrganizationsRepository } from '../organizations-repository';

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: data.id ?? randomUUID(),
      email: data.email,
      principal: data.principal,
      phone: data.phone,
      password: data.password,
      address: data.address,
      city: data.city,
      state: data.state,
      cep: data.cep,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(organization);

    return organization;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) =>
        organization.email.toLocaleLowerCase() === email.toLocaleLowerCase(),
    );

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((organization) => organization.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }
}
