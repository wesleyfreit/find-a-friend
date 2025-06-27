import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { adoption } from './adoption';
import { create } from './create';
import { details } from './details';
import { inTheCity } from './in-the-city';

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.post('/pets', create);
  app.get('/pets/search', inTheCity);
  app.get('/pets/:petId', details);
  app.get('/pets/adoption/:petId', adoption);
};
