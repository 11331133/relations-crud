import { IRepository } from '../common/IRepository';
import { HasPetRelation } from './HasPet.relation';

export interface IHasPetRepository extends IRepository<HasPetRelation> {
  getAllHasPetRelations(humanId: string): Promise<HasPetRelation[]>;
}
