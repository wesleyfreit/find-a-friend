import { makeFetchPetsInTheCityUseCase } from '@/factories/make-fetch-pets-in-the-city-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PetAge, PetAmbient, PetEnergy, PetIndependency, PetSize } from 'prisma/client';
import z from 'zod';

export const inTheCity = async (request: FastifyRequest, reply: FastifyReply) => {
  const inTheCityQuerySchema = z.object({
    city: z.string({ required_error: 'City is required' }).min(3),
    uf: z.string({ required_error: 'UF is required' }).length(2),
    age: z.nativeEnum(PetAge).optional(),
    ambient: z.nativeEnum(PetAmbient).optional(),
    energy: z.nativeEnum(PetEnergy).optional(),
    size: z.nativeEnum(PetSize).optional(),
    independency: z.nativeEnum(PetIndependency).optional(),
  });

  const { city, uf, ...optionalParams } = inTheCityQuerySchema.parse(request.query);

  const fetchPetsInTheCityUseCase = makeFetchPetsInTheCityUseCase();

  const { pets } = await fetchPetsInTheCityUseCase.execute({
    city,
    uf,
    params: optionalParams ?? undefined,
  });

  return reply.send({ pets });
};
