import { makeRegisterOrganizationUseCase } from '@/factories/make-register-organization-use-case';
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    principal: z.string({ required_error: 'Principal is required' }).min(3),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string().min(6),
    address: z.string({ required_error: 'Address is required' }).min(3),
    cep: z.string({ required_error: 'CEP is required' }).min(8),
    city: z.string({ required_error: 'City is required' }).min(3),
    state: z.string({ required_error: 'State is required' }).min(2),
    phone: z.string({ required_error: 'Phone is required' }).min(10),
    latitude: z.coerce.number({ required_error: 'Latitude is required' }),
    longitude: z.coerce.number({ required_error: 'Longitude is required' }),
  });

  const data = registerBodySchema.parse(request.body);

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase();

    await registerOrganizationUseCase.execute({
      ...data,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
};
