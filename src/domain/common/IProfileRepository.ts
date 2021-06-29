import { IRepository, isDeleted } from './IRepository';

export interface IProfileRepository<T> extends IRepository<T> {
  findOne(id: string): Promise<T | null>;
  deleteOne(id: string): Promise<isDeleted>;
}
