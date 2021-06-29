import { IRepository, isDeleted } from './IRepository';

export interface IRelationRepository<T> extends IRepository<T> {
  deleteOne(relatin: T): Promise<isDeleted>;
}
