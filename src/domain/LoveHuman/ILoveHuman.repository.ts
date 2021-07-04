import { IRelationRepository } from '../common/IRelationRepository';
import { LoveHumanRelation } from './LoveHuman.relation';

export interface ILoveHumanRepository
  extends IRelationRepository<LoveHumanRelation> {
  merge(relation: LoveHumanRelation): Promise<boolean>;
  getAllLoveHumanRelations(petId: string): Promise<LoveHumanRelation[]>;
}
