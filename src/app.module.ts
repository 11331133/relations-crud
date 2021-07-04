import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasFriendPersistenceModule } from './infrastructure/persistence/HasFriend/HasFriend.persistence-module';
import { AuthentificationGuard } from './infrastructure/webserver/common/Authentification.guard';
import { AuthorizationGuard } from './infrastructure/webserver/common/Authorization.guard';
import { HumanProfileWebModule } from './infrastructure/webserver/HumanProfile/HumanProfile.web-module';
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
    HumanProfileWebModule,
    PetProfileWebModule,
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
  ],
})
export class AppModule {}
