import { Module } from '@nestjs/common';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { HasFriendPersistenceService } from './HasFriend.persistence-service';

@Module({
  providers: [HasFriendPersistenceService, Neo4jClient],
  exports: [HasFriendPersistenceService],
})
export class HasFriendPersistenceModule {}
