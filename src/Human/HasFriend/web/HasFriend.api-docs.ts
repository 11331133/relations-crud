import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  CreateHasFriendRelationSchema,
  DeleteHasFriendRelationSchema,
} from '../domain/HasFriend.schema';

export class HasFriendApiDocs {
  public static createRelation = applyDecorators(
    ApiOperation({
      summary: 'Create relation',
      description: 'Valid token with Role.Human is required',
    }),
    ApiBearerAuth(),
    ApiBody({ schema: CreateHasFriendRelationSchema as SchemaObject }),
    ApiOkResponse({ description: 'Successfully created relation' }),
    ApiBadRequestResponse({ description: 'Cannot create circular relation' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static deleteRelation = applyDecorators(
    ApiOperation({
      summary: 'Delete relation',
      description: 'Valid token with Role.Human is required',
    }),
    ApiBody({ schema: DeleteHasFriendRelationSchema as SchemaObject }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully deleted relation' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static getAllFriends = applyDecorators(
    ApiOperation({
      summary: 'Retrieve all friends',
      description: 'Valid token with Role.Human is required',
    }),
    ApiParam({
      name: 'humanId',
      description: "Human profile's id (whose friends to retrieve)",
    }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Successfully retrieved friends list' }),
    ApiForbiddenResponse({ description: 'Validation error or access denied' }),
  );
}
