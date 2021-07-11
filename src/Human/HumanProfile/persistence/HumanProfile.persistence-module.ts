import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { TransactionRunner } from '../../../_common/infrastructure/persistence/TransactionRunner';
import { HumanProfileGraphPersistence } from './HumanProfile.graph-persistence';
import { HumanProfileOrmEntity } from './HumanProfile.orm-entity';
import { HumanProfilePersistenceService } from './HumanProfile.persistence-service';

@Module({
  imports: [TypeOrmModule.forFeature([HumanProfileOrmEntity])],
  providers: [
    Neo4jClient,
    HumanProfileGraphPersistence,
    TransactionRunner,
    HumanProfilePersistenceService,
  ],
  exports: [HumanProfilePersistenceService],
})
export class HumanProfilePersistenceModule {}
