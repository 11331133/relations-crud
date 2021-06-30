import { IRelationRepository } from '../common/IRelationRepository';
import { LoveHumanRelation } from './LoveHuman.relation';

export interface ILoveHumanRepository
  extends IRelationRepository<LoveHumanRelation> {
  getAllLoveHumanRelations(petId: string): Promise<LoveHumanRelation[]>;
}
