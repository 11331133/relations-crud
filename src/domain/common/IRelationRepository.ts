export interface IRelationRepository<T> {
  persist(relation: T): Promise<boolean>;
  deleteOne(from: string, to: string): Promise<boolean>;
}
