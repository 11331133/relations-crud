import { IRelationRepository } from '../../../_common/domain/IRelationRepository';
import { HasPetRelation } from './HasPet.relation';

export interface IHasPetRepository extends IRelationRepository<HasPetRelation> {
  getAllHasPetRelations(humanId: string): Promise<HasPetRelation[]>;
}
