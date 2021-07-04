import { Injectable } from '@nestjs/common';
import { Transaction } from 'neo4j-driver-core';
import { HumanProfile } from '../../../domain/HumanProfile/HumanProfile.entity';
import { Neo4jClient } from '../common/neo4jclient';

@Injectable()
export class HumanProfileGraphPersistence {
  constructor(private _neo4jclient: Neo4jClient) {}

  public async persist(profile: HumanProfile) {
    const query = 'MERGE (p: HumanProfile {id: $humanId})';
    const params = { humanId: profile.id };

    await this._neo4jclient.write(query, params);
  }

  public async deleteOne(humanId: string) {
    const query = 'MATCH (p: HumanProfile {id: $humanId})' + 'DETACH DELETE p';
    const params = { humanId };

    await this._neo4jclient.write(query, params);
  }

  public async deleteOneInTransaction(
    queryRunner: Transaction,
    humanId: string,
  ) {
    const query = 'MATCH (p: HumanProfile {id: $humanId})' + 'DETACH DELETE p';
    const params = { humanId };

    await queryRunner.run(query, params);
  }
}
