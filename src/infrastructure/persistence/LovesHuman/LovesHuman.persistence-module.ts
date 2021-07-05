import { Module } from '@nestjs/common';
import { Neo4jClient } from '../common/neo4jclient';
import { LovesHumanPersistenceService } from './LovesHuman.persistence-service';

@Module({
  providers: [LovesHumanPersistenceService, Neo4jClient],
  exports: [LovesHumanPersistenceService],
})
export class LovesHumanPersistenceModule {}
