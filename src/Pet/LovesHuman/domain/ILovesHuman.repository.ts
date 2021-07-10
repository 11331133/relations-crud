import { IRelationRepository } from '../../../_common/domain/IRelationRepository';
import { LovesHumanRelation } from './LovesHuman.relation';

export interface ILovesHumanRepository
  extends IRelationRepository<LovesHumanRelation> {
  merge(relation: LovesHumanRelation): Promise<void>;
  getAllLovesHumanRelations(petId: string): Promise<LovesHumanRelation[]>;
}
