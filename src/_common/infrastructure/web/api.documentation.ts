import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const apiDocumentConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Relations CRUD')
  .setDescription('API documentation')
  .setVersion('1.0')
  .build();

export const setupSwaggerModule = (app: INestApplication) => {
  const apiDocument = SwaggerModule.createDocument(app, apiDocumentConfig);
  SwaggerModule.setup('apidocs', app, apiDocument);
};
