import { Media } from 'prisma/client';

export interface MediasRepository {
  createMany(data: string[], petId: string): Promise<Media[]>;
}
