import { Global, Module } from '@nestjs/common';
import { Neo4jModule } from './Neo4j.module';
import { TransactionRunner } from './TransactionRunner';

@Global()
@Module({
  imports: [Neo4jModule],
  providers: [TransactionRunner],
  exports: [TransactionRunner],
})
export class TransactionRunnerModule {}
