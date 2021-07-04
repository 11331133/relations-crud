import { Module } from '@nestjs/common';
import { IValidate } from '../../../domain/common/IValidate';
import { ILoveHumanRepository } from '../../../domain/LoveHuman/ILoveHuman.repository';
import { LoveHumanRelationUseCases } from '../../../domain/LoveHuman/LoveHuman.usecases';
import { validate } from '../../adapters/validate.adapter';
import { LoveHumanPersistenceModule } from '../../persistence/LoveHuman/LoveHuman.persistence-module';
import { LoveHumanPersistenceService } from '../../persistence/LoveHuman/LoveHuman.persistence-service';
import { LoveHumanController } from './LoveHuman.controller';

@Module({
  imports: [LoveHumanPersistenceModule],
  controllers: [LoveHumanController],
  providers: [
    { provide: validate, useValue: validate },
    {
      provide: LoveHumanRelationUseCases,
      useFactory: (
        relationRepository: ILoveHumanRepository,
        validate: IValidate,
      ) => {
        return new LoveHumanRelationUseCases(relationRepository, validate);
      },
      inject: [LoveHumanPersistenceService, validate],
    },
  ],
})
export class LoveHumanWebModule {}
