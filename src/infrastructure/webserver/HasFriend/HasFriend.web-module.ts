import { Module } from '@nestjs/common';
import { IValidate } from '../../../domain/common/IValidate';
import { HasFriendRelationsUseCases } from '../../../domain/HasFriend/HasFriend.usecases';
import { IHasFriendRelRepository } from '../../../domain/HasFriend/IHasFriend.repository';
import { validate } from '../../adapters/validate.adapter';
import { HasFriendPersistenceModule } from '../../persistence/HasFriend/HasFriend.persistence-module';
import { HasFriendPersistenceService } from '../../persistence/HasFriend/HasFriend.persistence-service';

@Module({
  imports: [HasFriendPersistenceModule],
  providers: [
    { provide: validate, useValue: validate },
    {
      provide: HasFriendRelationsUseCases,
      useFactory: (
        relationRepository: IHasFriendRelRepository,
        validate: IValidate,
      ) => {
        return new HasFriendRelationsUseCases(relationRepository, validate);
      },
      inject: [HasFriendPersistenceService, validate],
    },
  ],
})
export class HasFriendWebModule {}
