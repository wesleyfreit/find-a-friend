export interface RequirementsRepository {
  createMany(requirements: string[], petId: string): Promise<void>;
}
