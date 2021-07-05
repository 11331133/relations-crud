import { Injectable } from '@nestjs/common';
import { ILovesHumanRepository } from '../../../domain/LovesHuman/ILovesHuman.repository';
import { LovesHumanRelation } from '../../../domain/LovesHuman/LovesHuman.relation';
import { Neo4jClient } from '../common/neo4jclient';

@Injectable()
export class LovesHumanPersistenceService implements ILovesHumanRepository {
  constructor(private _neo4jClient: Neo4jClient) {}

  public async persist(relation: LovesHumanRelation): Promise<void> {
    const query =
      'MATCH (pet:PetProfile {id: $petId}), ' +
      '(human:HumanProfile {id: $humanId}) ' +
      'MERGE (pet)-[relation:LOVES_HUMAN {strength: $strength}]->(human) ' +
      'RETURN relation';
    const params = {
      petId: relation.petId,
      humanId: relation.humanId,
      strength: relation.strength,
    };

    await this._neo4jClient.write(query, params);
  }

  public async merge(relation: LovesHumanRelation): Promise<void> {
    const query =
      'MATCH (pet:PetProfile {id: $petId})' +
      '-[relation:LOVES_HUMAN]->' +
      '(human:HumanProfile {id: $humanId}) ' +
      'SET relation.strength = $strength ' +
      'RETURN relation';
    const params = {
      petId: relation.petId,
      humanId: relation.humanId,
      strength: relation.strength,
    };

    await this._neo4jClient.write(query, params);
  }

  public async deleteOne(petId: string, humanId: string): Promise<void> {
    const query =
      'MATCH (pet:PetProfile {id: $petId})' +
      '-[relation:LOVES_HUMAN]->' +
      '(human:HumanProfile {id: $humanId}) ' +
      'DELETE relation';
    const params = {
      petId,
      humanId,
    };

    await this._neo4jClient.write(query, params);
  }

  public async getAllLovesHumanRelations(
    petId: string,
  ): Promise<LovesHumanRelation[]> {
    const query =
      'MATCH (:PetProfile {id: $petId})' +
      '-[relation:LOVES_HUMAN]->' +
      '(human)' +
      'RETURN human.id, relation.strength';
    const params = { petId };

    const result = await this._neo4jClient.read(query, params);
    return result.records.map(
      (record) =>
        new LovesHumanRelation(
          record.get('human.id'),
          petId,
          record.get('relation.strength'),
        ),
    );
  }
}
