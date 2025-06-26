import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details';
import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets-repository';

export const makeGetPetDetailsUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(prismaPetsRepository);

  return getPetDetailsUseCase;
};
