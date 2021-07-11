import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  CreateLovesHumanRelationSchema,
  EditLovesHumanRelationSchema,
} from '../domain/LovesHuman.schema';

export class LovesHumanApiDocs {
  public static createRelation = applyDecorators(
    ApiOperation({ summary: 'Create relation' }),
    ApiBody({ schema: CreateLovesHumanRelationSchema as SchemaObject }),
    ApiBearerAuth(),
    ApiCreatedResponse({ description: 'Successfully created relation' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static editRelation = applyDecorators(
    ApiOperation({ summary: 'Edit relation' }),
    ApiBody({ schema: EditLovesHumanRelationSchema as SchemaObject }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully edited relation' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static deleteRelation = applyDecorators(
    ApiOperation({
      summary: 'Delete relation',
      description: 'Valid token with Role.Pet is required',
    }),
    ApiParam({ name: 'humanId', description: "Human profile's id" }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully deleted relation' }),
  );

  public static getAllHumansPetLoves = applyDecorators(
    ApiOperation({
      summary: 'Retrieve all Humans that Pet loves',
      description: 'Valid token with Role.Pet is required',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successfully retrieved all Humans that Pet loves',
    }),
  );
}
