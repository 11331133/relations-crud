import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwaggerModule } from './_common/infrastructure/web/api.documentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerModule(app);
  app.use(helmet());

  await app.listen(3000);
}

bootstrap();
