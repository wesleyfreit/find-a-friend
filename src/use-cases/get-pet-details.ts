import { FullPet, PetsRepository } from '@/repositories/pets-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetPetDetailsUseCaseRequest {
  petId: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: FullPet;
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
