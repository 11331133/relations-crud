import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import {
  CreatePetProfileDTO,
  EditPetProfileDTO,
  GetPetProfileDTO,
  DeletePetProfileDTO,
} from '../domain/IPetProfile.dto';
import {
  CreatePetProfileSchema,
  EditPetProfileSchema,
} from '../domain/PetProfile.schema';
import { PetProfileUseCases } from '../domain/PetProfile.usecases';

@Controller('petProfile')
@ApiTags('Pet profile')
export class PetProfileController {
  constructor(private _useCases: PetProfileUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: "Creates Pet's profile",
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiBody({ schema: CreatePetProfileSchema as SchemaObject })
  @ApiCreatedResponse({ description: "Successfully created pet's profile" })
  @ApiForbiddenResponse({ description: 'Validation error' })
  @ApiMethodNotAllowedResponse({ description: 'Too many pets allready exists' })
  public async createProfile(
    @Body() dto: CreatePetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createProfile(dto, humanId);
  }

  @Put()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: "Edit Pet's profile",
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiBody({
    schema: EditPetProfileSchema as SchemaObject,
    description: 'Besides ID, at least one another property is required',
  })
  @ApiOkResponse({ description: "Successfully edited pet's profile" })
  @ApiForbiddenResponse({
    description:
      "Validation error or trying to edit profile of another owner's pet",
  })
  public async editProfile(
    @Body() dto: EditPetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Retrieve Pet's profile" })
  @ApiOkResponse({ description: "Successfully retrieved pet's profile" })
  @ApiNotFoundResponse({ description: "Pet's profile not found" })
  public async getProfile(@Param() dto: GetPetProfileDTO) {
    return await this._useCases.getProfile(dto);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: "Delete Pet's profile",
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Successfully deleted Pet's profile" })
  @ApiForbiddenResponse({
    description: "Trying to delete profile of another human's pet",
  })
  public async deleteProfile(
    @Param() dto: DeletePetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
