import { Global, Module } from '@nestjs/common';
import { Neo4jClient } from './neo4jclient';

@Global()
@Module({
  providers: [Neo4jClient],
  exports: [Neo4jClient],
})
export class Neo4jModule {}
