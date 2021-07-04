import { Module } from '@nestjs/common';
import { IGenerateId } from '../../../domain/common/IGenerateId';
import { IValidate } from '../../../domain/common/IValidate';
import { IHasPetRepository } from '../../../domain/HasPet/IHasPet.repository';
import { IPetProfileRepository } from '../../../domain/PetProfile/IPetProfile.repository';
import { PetProfileUseCases } from '../../../domain/PetProfile/PetProfile.usecases';
import { generateId } from '../../adapters/generateId.adapter';
import { validate } from '../../adapters/validate.adapter';
import { HasPetPersistenceModule } from '../../persistence/HasPet/HasPet.persistence-module';
import { HasPetPersistenceService } from '../../persistence/HasPet/HasPet.persistence-service';
import { PetProfilePersistenceModule } from '../../persistence/PetProfile/PetProfile.persistence-module';
import { PetProfilePersistenceService } from '../../persistence/PetProfile/PetProfile.persistence-service';
import { PetProfileController } from './PetProfile.controller';

@Module({
  imports: [PetProfilePersistenceModule, HasPetPersistenceModule],
  controllers: [PetProfileController],
  providers: [
    {
      provide: validate,
      useValue: validate,
    },
    { provide: generateId, useValue: generateId },
    {
      provide: PetProfileUseCases,
      useFactory: (
        profileRepository: IPetProfileRepository,
        relationRepository: IHasPetRepository,
        validate: IValidate,
        generateId: IGenerateId,
      ) => {
        return new PetProfileUseCases(
          profileRepository,
          relationRepository,
          validate,
          generateId,
        );
      },
      inject: [
        PetProfilePersistenceService,
        HasPetPersistenceService,
        validate,
        generateId,
      ],
    },
  ],
})
export class PetProfileWebModule {}
