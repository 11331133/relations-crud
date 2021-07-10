import { Module } from '@nestjs/common';
import { IValidate } from '../../../_common/domain/IValidate';
import { validate } from '../../../_common/infrastructure/adapters/validate.adapter';
import { HasPetRelationUseCases } from '../domain/HasPet.usecases';
import { IHasPetRepository } from '../domain/IHasPet.repository';
import { HasPetPersistenceModule } from '../persistence/HasPet.persistence-module';
import { HasPetPersistenceService } from '../persistence/HasPet.persistence-service';
import { HasPetController } from './HasPet.controller';

@Module({
  imports: [HasPetPersistenceModule],
  controllers: [HasPetController],
  providers: [
    { provide: validate, useValue: validate },
    {
      provide: HasPetRelationUseCases,
      useFactory: (
        relationRepository: IHasPetRepository,
        validate: IValidate,
      ) => {
        return new HasPetRelationUseCases(relationRepository, validate);
      },
      inject: [HasPetPersistenceService, validate],
    },
  ],
})
export class HasPetWebModule {}
