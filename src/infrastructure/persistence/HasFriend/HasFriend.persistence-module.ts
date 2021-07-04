import { Module } from '@nestjs/common';
import { Neo4jClient } from '../common/neo4jclient';
import { HasFriendGraphPersistence } from './HasFriend.graph-persistence';

@Module({
  providers: [HasFriendGraphPersistence, Neo4jClient],
  exports: [HasFriendGraphPersistence],
})
export class HasFriendPersistenceModule {}
