import { Module } from '@nestjs/common';
import { IHasPetRepository } from '../../../Human/HasPet/domain/IHasPet.repository';
import { HasPetPersistenceModule } from '../../../Human/HasPet/persistence/HasPet.persistence-module';
import { HasPetPersistenceService } from '../../../Human/HasPet/persistence/HasPet.persistence-service';
import { IGenerateId } from '../../../_common/domain/IGenerateId';
import { IValidate } from '../../../_common/domain/IValidate';
import { generateId } from '../../../_common/infrastructure/adapters/generateId.adapter';
import { validate } from '../../../_common/infrastructure/adapters/validate.adapter';
import { IPetProfileRepository } from '../domain/IPetProfile.repository';
import { PetProfileUseCases } from '../domain/PetProfile.usecases';
import { PetProfilePersistenceModule } from '../persistence/PetProfile.persistence-module';
import { PetProfilePersistenceService } from '../persistence/PetProfile.persistence-service';
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
