import { Module } from '@nestjs/common';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/neo4jclient';
import { HasPetPersistenceService } from './HasPet.persistence-service';

@Module({
  providers: [Neo4jClient, HasPetPersistenceService],
  exports: [HasPetPersistenceService],
})
export class HasPetPersistenceModule {}
