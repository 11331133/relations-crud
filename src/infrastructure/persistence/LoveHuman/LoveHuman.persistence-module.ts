import { Module } from '@nestjs/common';
import { Neo4jClient } from '../common/neo4jclient';
import { LoveHumanPersistenceService } from './LoveHuman.persistence-service';

@Module({
  providers: [LoveHumanPersistenceService, Neo4jClient],
  exports: [LoveHumanPersistenceService],
})
export class LoveHumanPersistenceModule {}
