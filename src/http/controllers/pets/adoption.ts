import { makeRequestAdoptionUseCase } from '@/factories/make-request-adoption-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export const adoption = async (request: FastifyRequest, reply: FastifyReply) => {
  const adoptionParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = adoptionParamsSchema.parse(request.params);

  const requestAdoptionUseCase = makeRequestAdoptionUseCase();

  const org = await requestAdoptionUseCase.execute({
    petId,
  });

  return reply.send({ ...org });
};
