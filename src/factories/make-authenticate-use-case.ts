import { PrismaOrganizationsRepository } from '../repositories/prisma/prisma-organizations-repository';
import { AuthenticateUseCase } from '../use-cases/authenticate';

export const makeAuthenticateUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaOrganizationsRepository);

  return authenticateUseCase;
};
