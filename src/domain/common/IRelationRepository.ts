export interface IRelationRepository<T> {
  persist(persistable: T): Promise<boolean>;
  deleteOne(from: string, to: string): Promise<boolean>;
}
