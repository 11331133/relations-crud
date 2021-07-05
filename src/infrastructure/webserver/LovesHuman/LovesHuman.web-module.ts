import { Module } from '@nestjs/common';
import { IValidate } from '../../../domain/common/IValidate';
import { ILovesHumanRepository } from '../../../domain/LovesHuman/ILovesHuman.repository';
import { LovesHumanRelationUseCases } from '../../../domain/LovesHuman/LovesHuman.usecases';
import { validate } from '../../adapters/validate.adapter';
import { LovesHumanPersistenceModule } from '../../persistence/LovesHuman/LovesHuman.persistence-module';
import { LovesHumanPersistenceService } from '../../persistence/LovesHuman/LovesHuman.persistence-service';
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
