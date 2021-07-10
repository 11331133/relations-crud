import { Module } from '@nestjs/common';
import { AuthentificationController } from './Authentification.controller';
import { AuthentificationService } from './Authentification.service';

@Module({
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationWebModule {}
