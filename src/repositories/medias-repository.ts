export interface MediasRepository {
  createMany(mediaPaths: string[], petId: string): Promise<void>;
}
