import { Module } from '@nestjs/common';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { HasPetPersistenceService } from './HasPet.persistence-service';

@Module({
  providers: [Neo4jClient, HasPetPersistenceService],
  exports: [HasPetPersistenceService],
})
export class HasPetPersistenceModule {}
