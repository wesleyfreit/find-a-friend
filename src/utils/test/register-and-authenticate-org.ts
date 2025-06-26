import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { prisma } from '@/lib/prisma';

const email = faker.internet.email();
const password = faker.internet.password();

export const registerAndAuthenticateOrg = async (app: FastifyInstance) => {
  const organization = await prisma.organization.create({
    data: {
      principal: faker.company.name(),
      email,
      password: await hash(password, 6),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode({ format: '#####-###' }),
      city: faker.location.city(),
      state: faker.location.state(),
      phone: faker.phone.number(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
  });
  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  });

  const { token } = authResponse.body;

  return {
    organization,
    token,
  };
};
