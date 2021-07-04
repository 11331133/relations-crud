import { Module } from '@nestjs/common';
import { Neo4jClient } from '../common/neo4jclient';
import { HasFriendPersistenceService } from './HasFriend.persistence-service';

@Module({
  providers: [HasFriendPersistenceService, Neo4jClient],
  exports: [HasFriendPersistenceService],
})
export class HasFriendPersistenceModule {}
