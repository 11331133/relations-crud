import { Module } from '@nestjs/common';
import { IValidate } from '../../../domain/common/IValidate';
import { HasPetRelationUseCases } from '../../../domain/HasPet/HasPet.usecases';
import { IHasPetRepository } from '../../../domain/HasPet/IHasPet.repository';
import { validate } from '../../adapters/validate.adapter';
import { HasPetPersistenceModule } from '../../persistence/HasPet/HasPet.persistence-module';
import { HasPetPersistenceService } from '../../persistence/HasPet/HasPet.persistence-service';
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
