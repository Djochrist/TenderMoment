export interface IStorage {
  // No operations needed for a stateless, serverless app
}

export class MemStorage implements IStorage {}

export const storage = new MemStorage();
