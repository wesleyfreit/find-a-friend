import { mountUploadFileUrl } from '@/utils/upload-file';
import { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export const mountUrlBodySchema = z.object({
  filename: z.string({ required_error: 'Filename is required' }),
});

export const upload = async (request: FastifyRequest, reply: FastifyReply) => {
  const { filename } = mountUrlBodySchema.parse(request.body);

  const filePath = `${randomUUID()}_${filename.replace(/ /g, '_')}`;

  const { signedUrl } = await mountUploadFileUrl(filePath);

  return reply.status(200).send({ filePath, signedUrl });
};
