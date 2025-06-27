import { RequestAdoptionUseCase } from '@/use-cases/request-adoption';
import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets-repository';

export const makeRequestAdoptionUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const requestadoptionUseCase = new RequestAdoptionUseCase(prismaPetsRepository);

  return requestadoptionUseCase;
};
