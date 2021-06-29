export type isPersisted = boolean;
export type isMerged = boolean;
export type isDeleted = boolean;

export interface IRepository<T> {
  persist(persistable: T): Promise<isPersisted>;
  merge(mergeable: T): Promise<isMerged>;
}
