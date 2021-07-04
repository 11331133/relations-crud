import { IRelationRepository } from '../common/IRelationRepository';
import { HasPetRelation } from './HasPet.relation';

export interface IHasPetRepository extends IRelationRepository<HasPetRelation> {
  getAllHasPetRelations(humanId: string): Promise<HasPetRelation[]>;
}
