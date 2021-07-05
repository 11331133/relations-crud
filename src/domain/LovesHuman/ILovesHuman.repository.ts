import { IRelationRepository } from '../common/IRelationRepository';
import { LovesHumanRelation } from './LovesHuman.relation';

export interface ILovesHumanRepository
  extends IRelationRepository<LovesHumanRelation> {
  merge(relation: LovesHumanRelation): Promise<boolean>;
  getAllLovesHumanRelations(petId: string): Promise<LovesHumanRelation[]>;
}
