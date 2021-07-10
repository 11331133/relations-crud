import { Module } from '@nestjs/common';
import { HasFriendPersistenceModule } from '../../../Human/HasFriend/persistence/HasFriend.persistence-module';
import { IValidate } from '../../../_common/domain/IValidate';
import { validate } from '../../../_common/infrastructure/adapters/validate.adapter';
import { HasFriendRelationsUseCases } from '../domain/HasFriend.usecases';
import { IHasFriendRelRepository } from '../domain/IHasFriend.repository';
import { HasFriendPersistenceService } from '../persistence/HasFriend.persistence-service';
import { HasFriendController } from './HasFriend.controller';

@Module({
  imports: [HasFriendPersistenceModule],
  controllers: [HasFriendController],
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
