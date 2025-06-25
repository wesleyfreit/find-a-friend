import { randomUUID } from 'node:crypto';
import { Media } from 'prisma/client';
import { MediasRepository } from '../medias-repository';

export class InMemoryMediasRepository implements MediasRepository {
  public items: Media[] = [];

  async createMany(data: string[], petId: string): Promise<Media[]> {
    data.map((path) => {
      const media: Media = {
        id: randomUUID(),
        path,
        petId,
        createdAt: new Date(),
      };

      this.items.push(media);
    });

    return this.items;
  }
}
