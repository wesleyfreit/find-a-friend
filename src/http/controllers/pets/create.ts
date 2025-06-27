import { makeCreatePetUseCase } from '@/factories/make-create-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PetAge, PetAmbient, PetEnergy, PetIndependency, PetSize } from 'prisma/client';
import z from 'zod';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.nativeEnum(PetAge),
    ambient: z.nativeEnum(PetAmbient),
    energy: z.nativeEnum(PetEnergy),
    size: z.nativeEnum(PetSize),
    independency: z.nativeEnum(PetIndependency),
    orgId: z.string().uuid(),
    medias: z.array(z.string().url()).optional(),
    requirements: z.array(z.string()).optional(),
  });

  const data = createBodySchema.parse(request.body);

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    ...data,
  });

  return reply.status(201).send();
};
