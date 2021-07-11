import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiMethodNotAllowedResponse,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  CreatePetProfileSchema,
  EditPetProfileSchema,
} from '../domain/PetProfile.schema';

export class PetProfileApiDocs {
  public static createProfile = applyDecorators(
    ApiOperation({
      summary: "Creates Pet's profile",
      description: 'Valid token with Role.Human is required',
    }),
    ApiBearerAuth(),
    ApiBody({ schema: CreatePetProfileSchema as SchemaObject }),
    ApiCreatedResponse({ description: "Successfully created pet's profile" }),
    ApiForbiddenResponse({ description: 'Validation error' }),
    ApiMethodNotAllowedResponse({
      description: 'Too many pets allready exists',
    }),
  );

  public static editProfile = applyDecorators(
    ApiOperation({
      summary: "Edit Pet's profile",
      description: 'Valid token with Role.Human is required',
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: EditPetProfileSchema as SchemaObject,
      description: 'Besides ID, at least one another property is required',
    }),
    ApiOkResponse({ description: "Successfully edited pet's profile" }),
    ApiForbiddenResponse({
      description:
        "Validation error or trying to edit profile of another owner's pet",
    }),
  );

  public static getProfile = applyDecorators(
    ApiOperation({ summary: "Retrieve Pet's profile" }),
    ApiParam({ name: 'id', description: "Profile's id" }),
    ApiOkResponse({ description: "Successfully retrieved pet's profile" }),
    ApiNotFoundResponse({ description: "Pet's profile not found" }),
  );

  public static deleteProfile = applyDecorators(
    ApiOperation({
      summary: "Delete Pet's profile",
      description: 'Valid token with Role.Human is required',
    }),
    ApiParam({ name: 'id', description: "Profile's id" }),
    ApiBearerAuth(),
    ApiOkResponse({ description: "Successfully deleted Pet's profile" }),
    ApiForbiddenResponse({
      description: "Trying to delete profile of another human's pet",
    }),
  );
}
