import { makeGetPetDetailsUseCase } from '@/factories/make-get-pet-details-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export const details = async (request: FastifyRequest, reply: FastifyReply) => {
  const detailsParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = detailsParamsSchema.parse(request.params);

  const getPetDetailsPetUseCase = makeGetPetDetailsUseCase();

  const { pet } = await getPetDetailsPetUseCase.execute({
    petId,
  });

  return reply.send({ pet });
};
