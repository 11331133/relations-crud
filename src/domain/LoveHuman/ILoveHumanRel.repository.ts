import { IRepository } from '../common/IRepository';
import { LoveHumanRelation } from './LoveHuman.relation';

export interface ILoveHumanRepository extends IRepository<LoveHumanRelation> {
  getAllLoveHumans(petId: string): Promise<LoveHumanRelation[]>;
}
