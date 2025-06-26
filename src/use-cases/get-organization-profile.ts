import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { Optional } from '@/types/optional';
import { type Organization } from 'prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetOrganizationProfileUseCaseRequest {
  organizationId: string;
}

interface GetOrganizationProfileUseCaseResponse {
  organization: Optional<Organization, 'password'>;
}

export class GetOrganizationProfileUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(organizationId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    return {
      organization,
    };
  }
}
