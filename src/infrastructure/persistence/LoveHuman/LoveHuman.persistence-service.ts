import { ILoveHumanRepository } from '../../../domain/LoveHuman/ILoveHuman.repository';
import { LoveHumanRelation } from '../../../domain/LoveHuman/LoveHuman.relation';
import { Neo4jClient } from '../common/neo4jclient';

export class LoveHumanPersistenceService implements ILoveHumanRepository {
  constructor(private _neo4jClient: Neo4jClient) {}

  public async persist(relation: LoveHumanRelation): Promise<boolean> {
    const query =
      'MATCH (pet:PetProfile {id: $petId}), ' +
      '(human:HumanProfile {id: $humanId}) ' +
      'MERGE (pet)-[relation:LOVE_HUMAN {strength: $strength}]->(human) ' +
      'RETURN relation';
    const params = {
      petId: relation.petId,
      humanId: relation.humanId,
      strength: relation.strength,
    };

    await this._neo4jClient.write(query, params);
    return true;
  }

  public async merge(relation: LoveHumanRelation): Promise<boolean> {
    const query =
      'MATCH (pet:PetProfile {id: $petId})' +
      '-[relation:LOVE_HUMAN]->' +
      '(human:HumanProfile {id: $humanId}) ' +
      'SET relation.strength = $strength ' +
      'RETURN relation';
    const params = {
      petId: relation.petId,
      humanId: relation.humanId,
      strength: relation.strength,
    };

    await this._neo4jClient.write(query, params);
    return true;
  }

  public async deleteOne(humanId: string, petId: string): Promise<boolean> {
    const query =
      'MATCH (pet:PetProfile {id: $petId})' +
      '-[relation:LOVE_HUMAN]->' +
      '(human:HumanProfile {id: $humanId}) ' +
      'DELETE relation';

    const params = {
      petId,
      humanId,
    };

    await this._neo4jClient.write(query, params);
    return true;
  }

  public async getAllLoveHumanRelations(
    petId: string,
  ): Promise<LoveHumanRelation[]> {
    const query =
      'MATCH (:PetProfile {id: $petId})' +
      '-[relation:LOVE_HUMAN]->' +
      '(humans)' +
      'RETURN humans';
    const params = { petId };

    const result = await this._neo4jClient.read(query, params);
    console.log(result);
    return [];
  }
}
