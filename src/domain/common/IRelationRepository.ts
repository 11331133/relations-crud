import { IRepository, isDeleted } from './IRepository';

export interface IRelationRepository<T> extends IRepository<T> {
  deleteOne(
    from: string,
    to: string,
    bidirecitonal?: boolean,
  ): Promise<isDeleted>;
}
