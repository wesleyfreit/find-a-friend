import { type Pet } from 'prisma/client';
import { PetParams, PetsRepository } from '../repositories/pets-repository';

interface FetchPetsInTheCityUseCaseRequest {
  city: string;
  uf: string;
  params?: PetParams;
}

interface FetchPetsInTheCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsInTheCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    uf,
    params,
  }: FetchPetsInTheCityUseCaseRequest): Promise<FetchPetsInTheCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCityAndUF(city, uf, params);

    return {
      pets,
    };
  }
}
