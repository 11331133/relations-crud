export interface IRelationRepository<T> {
  persist(relation: T): Promise<void>;
  deleteOne(from: string, to: string): Promise<void>;
}
