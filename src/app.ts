import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { organizationsRoutes } from './http/controllers/organizations/routes';
import { petsRoutes } from './http/controllers/pets/routes';
import { signersRoutes } from './http/controllers/signers/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(organizationsRoutes);
app.register(petsRoutes);
app.register(signersRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ error: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here I should log to an external monitoring service like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ error: 'Internal server error' });
});
