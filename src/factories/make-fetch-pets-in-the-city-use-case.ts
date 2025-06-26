import { FetchPetsInTheCityUseCase } from '@/use-cases/fetch-pets-in-the-city';
import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets-repository';

export const makeFetchPetsInTheCityUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const fetchPetsInTheCityUseCase = new FetchPetsInTheCityUseCase(prismaPetsRepository);

  return fetchPetsInTheCityUseCase;
};
