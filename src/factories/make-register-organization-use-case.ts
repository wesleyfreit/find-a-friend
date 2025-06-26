import { RegisterOrganizationUseCase } from '@/use-cases/register-organization';
import { PrismaOrganizationsRepository } from '../repositories/prisma/prisma-organizations-repository';

export const makeRegisterOrganizationUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const registerorganizationUseCase = new RegisterOrganizationUseCase(
    prismaOrganizationsRepository,
  );

  return registerorganizationUseCase;
};
