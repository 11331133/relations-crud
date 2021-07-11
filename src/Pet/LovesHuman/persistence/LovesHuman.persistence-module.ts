import { Module } from '@nestjs/common';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { LovesHumanPersistenceService } from './LovesHuman.persistence-service';

@Module({
  providers: [LovesHumanPersistenceService, Neo4jClient],
  exports: [LovesHumanPersistenceService],
})
export class LovesHumanPersistenceModule {}
