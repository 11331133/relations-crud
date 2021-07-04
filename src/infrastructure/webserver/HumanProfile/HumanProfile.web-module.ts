import { Module } from '@nestjs/common';
import { IGenerateId } from '../../../domain/common/IGenerateId';
import { IValidate } from '../../../domain/common/IValidate';
import { IHasFriendRelRepository } from '../../../domain/HasFriend/IHasFriend.repository';
import { HumanProfileUseCases } from '../../../domain/HumanProfile/HumanProfile.usecases';
import { IHumanProfileRepository } from '../../../domain/HumanProfile/IHumanProfile.repository';
import { generateId } from '../../adapters/generateId.adapter';
import { validate } from '../../adapters/validate.adapter';
import { HasFriendPersistenceService } from '../../persistence/HasFriend/HasFriend.persistence-service';
import { HasFriendPersistenceModule } from '../../persistence/HasFriend/HasFriend.persistence-module';
import { HumanProfilePersistenceModule } from '../../persistence/HumanProfile/HumanProfile.persistence-module';
import { HumanProfilePersistenceService } from '../../persistence/HumanProfile/HumanProfile.persistence-service';
import { HumanProfileController } from './HumanProfile.controller';

@Module({
  imports: [HumanProfilePersistenceModule, HasFriendPersistenceModule],
  controllers: [HumanProfileController],
  providers: [
    {
      provide: validate,
      useValue: validate,
    },
    { provide: generateId, useValue: generateId },
    {
      provide: HumanProfileUseCases,
      useFactory: (
        profileRepository: IHumanProfileRepository,
        relationRepository: IHasFriendRelRepository,
        validate: IValidate,
        generateId: IGenerateId,
      ) => {
        return new HumanProfileUseCases(
          profileRepository,
          relationRepository,
          validate,
          generateId,
        );
      },
      inject: [
        HumanProfilePersistenceService,
        HasFriendPersistenceService,
        validate,
        generateId,
      ],
    },
  ],
})
export class HumanProfileWebModule {}
