import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  CreateHumanProfileSchema,
  EditHumanProfileSchema,
} from '../domain/HumanProfile.schema';

export class HumanProfileApiDocs {
  public static createProfile = applyDecorators(
    ApiOperation({ summary: "Create Human's profile" }),
    ApiBody({ schema: CreateHumanProfileSchema as SchemaObject }),
    ApiCreatedResponse({ description: 'Profile successfully created' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static editProfile = applyDecorators(
    ApiOperation({
      summary: "Update Human's profile data",
      description: 'Valid token with Role.Human is required',
    }),
    ApiBody({
      schema: EditHumanProfileSchema as SchemaObject,
      description: 'Besides ID, at least one another property is required',
    }),
    ApiBearerAuth(),
    ApiOkResponse({ description: 'Profile successfully edited' }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );

  public static getProfile = applyDecorators(
    ApiOperation({
      summary: "Retrieve Human's profile",
      description: 'Optional valid token with Role.Human can be given',
    }),
    ApiParam({ name: 'id', description: "Profile's id" }),
    ApiBearerAuth(),
    ApiOkResponse({ description: "Successfully retrieved Human's profile" }),
    ApiNotFoundResponse({ description: "Human's profile not found" }),
  );

  public static deleteProfile = applyDecorators(
    ApiOperation({
      summary: "Delete Human's profile",
      description: 'Valid token with Role.Human is required',
    }),
    ApiParam({ name: 'id', description: "Profile's id" }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successfully executed request for deletion',
    }),
    ApiForbiddenResponse({ description: 'Validation error' }),
  );
}
