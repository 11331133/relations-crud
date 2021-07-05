import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationGuard } from './infrastructure/webserver/common/Auth/Authentification.guard';
import { AuthentificationWebModule } from './infrastructure/webserver/common/Auth/Authentification.web-module';
import { AuthorizationGuard } from './infrastructure/webserver/common/Authorization.guard';
import { StatusCodeInterceptor } from './infrastructure/webserver/common/StatusCode.interceptor';
import { HasFriendWebModule } from './infrastructure/webserver/HasFriend/HasFriend.web-module';
import { HasPetWebModule } from './infrastructure/webserver/HasPet/HasPet.web-module';
import { HumanProfileWebModule } from './infrastructure/webserver/HumanProfile/HumanProfile.web-module';
import { LovesHumanWebModule } from './infrastructure/webserver/LovesHuman/LovesHuman.web-module';
import { PetProfileWebModule } from './infrastructure/webserver/PetProfile/PetProfile.web-module';

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
        port: +configService.get<number>('RELATONAL_DB_PORT'),
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
