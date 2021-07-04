import { Injectable } from '@nestjs/common';
import { HasPetRelation } from '../../../domain/HasPet/HasPet.relation';
import { IHasPetRepository } from '../../../domain/HasPet/IHasPet.repository';
import { Neo4jClient } from '../common/neo4jclient';

@Injectable()
export class HasPetPersistenceService implements IHasPetRepository {
  constructor(private _neo4jClient: Neo4jClient) {}

  public async persist(relation: HasPetRelation): Promise<boolean> {
    const query =
      'MATCH (human:HumanProfile {id: $humanId}), ' +
      '(pet:PetProfile {id: $petId}) ' +
      'MERGE (human)-[relation:HAS_PET]->(pet) ' +
      'RETURN relation';
    const params = { humanId: relation.owner, petId: relation.petId };

    const result = await this._neo4jClient.write(query, params);
    return true;
  }

  public async deleteOne(humanId: string, petId: string): Promise<boolean> {
    const query =
      'MATCH (human:HumanProfile {id: $humanId})' +
      '-[relation:HAS_PET]->' +
      '(pet:PetProfile {id: $petId}) ' +
      'DELETE relation';
    const params = { humanId, petId };

    await this._neo4jClient.write(query, params);
    return true;
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
