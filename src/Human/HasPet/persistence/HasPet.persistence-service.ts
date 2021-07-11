import { Injectable } from '@nestjs/common';
import { HasPetRelation } from '../../../Human/HasPet/domain/HasPet.relation';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { IHasPetRepository } from '../domain/IHasPet.repository';

@Injectable()
export class HasPetPersistenceService implements IHasPetRepository {
  constructor(private _neo4jClient: Neo4jClient) {}

  public async persist(relation: HasPetRelation): Promise<void> {
    const query =
      'MATCH (human:HumanProfile {id: $humanId}), ' +
      '(pet:PetProfile {id: $petId}) ' +
      'MERGE (human)-[:HAS_PET]->(pet)';
    const params = { humanId: relation.owner, petId: relation.petId };

    await this._neo4jClient.write(query, params);
  }

  public async deleteOne(humanId: string, petId: string): Promise<void> {
    const query =
      'MATCH (:HumanProfile {id: $humanId})' +
      '-[relation:HAS_PET]->' +
      '(:PetProfile {id: $petId}) ' +
      'DELETE relation';
    const params = { humanId, petId };

    await this._neo4jClient.write(query, params);
  }

  public async getAllHasPetRelations(
    humanId: string,
  ): Promise<HasPetRelation[]> {
    const query =
      'MATCH (human:HumanProfile {id: $humanId})' +
      '-[relation:HAS_PET]->(pets) ' +
      'RETURN pets.id';
    const params = { humanId };

    const response = await this._neo4jClient.read(query, params);

    return response.records.map(
      (record) => new HasPetRelation(humanId, record.get('pets.id')),
    );
  }
}
