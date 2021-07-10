import { Module } from '@nestjs/common';
import { IGenerateId } from '../../../_common/domain/IGenerateId';
import { IValidate } from '../../../_common/domain/IValidate';
import { generateId } from '../../../_common/infrastructure/adapters/generateId.adapter';
import { validate } from '../../../_common/infrastructure/adapters/validate.adapter';
import { IHasFriendRelRepository } from '../../HasFriend/domain/IHasFriend.repository';
import { HasFriendPersistenceModule } from '../../HasFriend/persistence/HasFriend.persistence-module';
import { HasFriendPersistenceService } from '../../HasFriend/persistence/HasFriend.persistence-service';
import { HumanProfileUseCases } from '../domain/HumanProfile.usecases';
import { IHumanProfileRepository } from '../domain/IHumanProfile.repository';
import { HumanProfilePersistenceModule } from '../persistence/HumanProfile.persistence-module';
import { HumanProfilePersistenceService } from '../persistence/HumanProfile.persistence-service';
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
