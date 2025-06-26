import { Optional } from '@/types/optional';
import { Prisma, type Organization } from 'prisma/client';

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findByEmail(email: string): Promise<Organization | null>;
  findById(id: string): Promise<Optional<Organization, 'password'> | null>;
}
