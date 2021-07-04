export interface IProfileRepository<T> {
  persist(profile: T): Promise<boolean>;
  merge(profile: T): Promise<boolean>;
  findOne(id: string): Promise<T | undefined>;
  deleteOne(id: string): Promise<boolean>;
}
