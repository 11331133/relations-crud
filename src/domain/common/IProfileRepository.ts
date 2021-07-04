export interface IProfileRepository<T> {
  persist(persistable: T): Promise<boolean>;
  merge(mergeable: T): Promise<boolean>;
  findOne(id: string): Promise<T | undefined>;
  deleteOne(id: string): Promise<boolean>;
}
