import { GetOrganizationProfileUseCase } from '@/use-cases/get-organization-profile';
import { PrismaOrganizationsRepository } from '../repositories/prisma/prisma-organizations-repository';

export const makeGetOrganizationProfileUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const getorganizationprofileUseCase = new GetOrganizationProfileUseCase(
    prismaOrganizationsRepository,
  );

  return getorganizationprofileUseCase;
};
