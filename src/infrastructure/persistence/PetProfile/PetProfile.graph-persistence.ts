import { Injectable } from '@nestjs/common';
import { Transaction } from 'neo4j-driver-core';
import { PetProfile } from '../../../domain/PetProfile/PetProfile.entity';
import { Neo4jClient } from '../common/neo4jclient';

@Injectable()
export class PetProfileGraphPersistence {
  constructor(private _neo4jclient: Neo4jClient) {}

  public async persist(profile: PetProfile) {
    const query = 'MERGE (p: PetProfile {id: $PetId})';
    const params = { PetId: profile.id };

    await this._neo4jclient.write(query, params);
  }

  public async deleteOne(PetId: string) {
    const query = 'MATCH (p: PetProfile {id: $PetId}) DETACH DELETE p';
    const params = { PetId };

    await this._neo4jclient.write(query, params);
  }

  public async deleteOneInTransaction(queryRunner: Transaction, PetId: string) {
    const query = 'MATCH (p: PetProfile {id: $PetId}) DETACH DELETE p';
    const params = { PetId };

    await queryRunner.run(query, params);
  }
}
