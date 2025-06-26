import { PrismaMediasRepository } from '@/repositories/prisma/prisma-medias-repository';
import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository';
import { CreatePetUseCase } from '@/use-cases/create-pet';
import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets-repository';

export const makeCreatePetUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaMediasRepository = new PrismaMediasRepository();
  const prismaRequirementsRepository = new PrismaRequirementsRepository();
  const createPetUseCase = new CreatePetUseCase(
    prismaPetsRepository,
    prismaMediasRepository,
    prismaRequirementsRepository,
  );

  return createPetUseCase;
};
