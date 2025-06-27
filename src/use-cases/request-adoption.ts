import { PetsRepository } from '@/repositories/pets-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface RequestAdoptionUseCaseRequest {
  petId: string;
}

interface RequestAdoptionUseCaseResponse {
  organizationPrincipal: string;
  whatsappNumber: string;
}

export class RequestAdoptionUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: RequestAdoptionUseCaseRequest): Promise<RequestAdoptionUseCaseResponse> {
    const organization = await this.petsRepository.findPetOrg(petId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    return {
      organizationPrincipal: organization.principal,
      whatsappNumber: organization.phone,
    };
  }
}
