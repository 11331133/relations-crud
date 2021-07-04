import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neo4jClient } from '../common/neo4jclient';
import { TransactionRunner } from '../common/TransactionRunner';
import { PetProfileGraphPersistence } from './PetProfile.graph-persistence';
import { PetProfileOrmEntity } from './PetProfile.orm-entity';
import { PetProfilePersistenceService } from './PetProfile.persistence-service';

@Module({
  imports: [TypeOrmModule.forFeature([PetProfileOrmEntity])],
  providers: [
    Neo4jClient,
    PetProfileGraphPersistence,
    TransactionRunner,
    PetProfilePersistenceService,
  ],
  exports: [PetProfilePersistenceService],
})
export class PetProfilePersistenceModule {}
