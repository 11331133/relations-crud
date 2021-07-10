import { Module } from '@nestjs/common';
import { IValidate } from '../../../_common/domain/IValidate';
import { validate } from '../../../_common/infrastructure/adapters/validate.adapter';
import { ILovesHumanRepository } from '../domain/ILovesHuman.repository';
import { LovesHumanRelationUseCases } from '../domain/LovesHuman.usecases';
import { LovesHumanPersistenceModule } from '../persistence/LovesHuman.persistence-module';
import { LovesHumanPersistenceService } from '../persistence/LovesHuman.persistence-service';
import { LovesHumanController } from './LovesHuman.controller';

@Module({
  imports: [LovesHumanPersistenceModule],
  controllers: [LovesHumanController],
  providers: [
    { provide: validate, useValue: validate },
    {
      provide: LovesHumanRelationUseCases,
      useFactory: (
        relationRepository: ILovesHumanRepository,
        validate: IValidate,
      ) => {
        return new LovesHumanRelationUseCases(relationRepository, validate);
      },
      inject: [LovesHumanPersistenceService, validate],
    },
  ],
})
export class LovesHumanWebModule {}
