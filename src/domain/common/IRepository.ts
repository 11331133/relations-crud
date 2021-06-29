type isPersisted = boolean;
type isMerged = boolean;
type isDeleted = boolean;

export interface IRepository<T> {
  persist(persistable: T): Promise<isPersisted>;
  merge(mergeable: T): Promise<isMerged>;
  findOne(id: string): Promise<T | null>;
  deleteOne(id: string): Promise<isDeleted>;
}
