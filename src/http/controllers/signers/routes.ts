import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { upload } from './upload';

export const signersRoutes = async (app: FastifyInstance) => {
  app.post(
    '/mount/upload',
    {
      onRequest: [verifyJWT],
    },
    upload,
  );
};
