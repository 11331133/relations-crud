import { Module } from '@nestjs/common';
import { AuthentificationService } from '../../../auth/Authentification.service';
import { AuthentificationController } from './Authentification.controller';

@Module({
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationWebModule {}
