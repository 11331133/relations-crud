export interface IProfileRepository<T> {
  persist(profile: T): Promise<void>;
  merge(profile: T): Promise<void>;
  findOne(id: string): Promise<T | undefined>;
  deleteOne(id: string): Promise<void>;
}
