import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Transaction } from 'neo4j-driver-core';
import { EntityManager } from 'typeorm';
import { IQueryRunnerFactory } from './IQueryRunnerFactory.typeorm';
import { Neo4jClient } from './neo4jclient';

@Injectable()
export class TransactionRunner {
  constructor(
    @InjectConnection() private _relationalDBConnection: IQueryRunnerFactory,
    private _graphDBConnection: Neo4jClient,
  ) {}

  public async run(
    relationalDBcallback: (manager: EntityManager) => Promise<void>,
    graphDBcallback: (queryRunner: Transaction) => Promise<void>,
  ) {
    const relationalDBQueryRunner = this._relationalDBConnection.createQueryRunner();
    await relationalDBQueryRunner.connect();
    await relationalDBQueryRunner.startTransaction();

    const graphDBSession = this._graphDBConnection.connect();
    const graphDBQueryRunner = graphDBSession.beginTransaction();

    try {
      await Promise.all([
        relationalDBcallback(relationalDBQueryRunner.manager),
        graphDBcallback(graphDBQueryRunner),
      ]);
      await Promise.all([
        relationalDBQueryRunner.commitTransaction(),
        graphDBQueryRunner.commit(),
      ]);
    } catch (error) {
      await Promise.all([
        relationalDBQueryRunner.rollbackTransaction(),
        graphDBQueryRunner.rollback(),
      ]);
    } finally {
      await Promise.all([
        relationalDBQueryRunner.release(),
        graphDBSession.close(),
      ]);
    }
  }
}
