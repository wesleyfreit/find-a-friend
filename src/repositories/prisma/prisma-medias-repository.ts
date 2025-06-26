import { prisma } from '@/lib/prisma';
import { MediasRepository } from '../medias-repository';

export class PrismaMediasRepository implements MediasRepository {
  async createMany(mediaPaths: string[], petId: string): Promise<void> {
    await prisma.media.createMany({
      data: mediaPaths.map((path) => ({
        path,
        petId,
      })),
    });
  }
}
