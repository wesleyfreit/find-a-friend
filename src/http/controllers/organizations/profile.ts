import { makeGetOrganizationProfileUseCase } from '@/factories/make-get-organization-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getOrganizationProfileUseCase = makeGetOrganizationProfileUseCase();

  try {
    const { organization } = await getOrganizationProfileUseCase.execute({
      organizationId: request.user.sub,
    });

    return reply.status(200).send({
      organization,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
};
