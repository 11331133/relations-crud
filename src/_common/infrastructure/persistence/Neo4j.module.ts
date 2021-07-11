import { Global, Module } from '@nestjs/common';
import { Neo4jClient } from './Neo4j.client';

@Global()
@Module({
  providers: [Neo4jClient],
  exports: [Neo4jClient],
})
export class Neo4jModule {}
