import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiMethodNotAllowedResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CreateHasPetRelationSchema } from '../domain/HasPet.schema';

export class HasPetApiDocs {
  public static createRelation = applyDecorators(
    ApiOperation({
      summary: 'Create relation',
      description: 'Valid token with Role.Human is required',
    }),
    ApiBody({ schema: CreateHasPetRelationSchema as SchemaObject }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully created relation' }),
    ApiMethodNotAllowedResponse({
      description: 'Too many pets allready exists',
    }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static deleteRelation = applyDecorators(
    ApiOperation({
      summary: 'Delete relation',
      description: 'Valid token with Role.Human is required',
    }),
    ApiParam({ name: 'petId', description: "Pet profile's id" }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully deleted relation' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static getAllHasPetRelations = applyDecorators(
    ApiOperation({
      summary: 'Retrieve all Pets that Human with given ID has',
      description: 'Valid token with Role.Human is required',
    }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully retrieved all relations' }),
  );
}
