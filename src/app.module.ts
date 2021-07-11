import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationGuard } from './Auth/Authentification.guard';
import { AuthentificationWebModule } from './Auth/Authentification.web-module';
import { AuthorizationGuard } from './Auth/Authorization.guard';
import { StatusCodeInterceptor } from './Auth/common/StatusCode.interceptor';
import { HasFriendWebModule } from './Human/HasFriend/web/HasFriend.web-module';
import { HasPetWebModule } from './Human/HasPet/web/HasPet.web-module';
import { HumanProfileWebModule } from './Human/HumanProfile/web/HumanProfile.web-module';
import { LovesHumanWebModule } from './Pet/LovesHuman/web/LovesHuman.web-module';
import { PetProfileWebModule } from './Pet/PetProfile/web/PetProfile.web-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('RELATIONAL_DB_HOST'),
        port: +configService.get<number>('RELATIONAL_DB_PORT'),
        username: configService.get('RELATIONAL_DB_USERNAME'),
        password: configService.get('RELATIONAL_DB_PASSWORD'),
        database: configService.get('RELATIONAL_DB_DATABASENAME'),
        autoLoadEntities: true,
        synchronize:
          configService.get('NODE_ENV') === 'production' ? false : true,
      }),
      inject: [ConfigService],
    }),
    AuthentificationWebModule,
    HumanProfileWebModule,
    PetProfileWebModule,
    LovesHumanWebModule,
    HasPetWebModule,
    HasFriendWebModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthentificationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusCodeInterceptor,
    },
  ],
})
export class AppModule {}
