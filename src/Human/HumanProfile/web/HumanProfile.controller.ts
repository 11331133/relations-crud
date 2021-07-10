import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanProfileUseCases } from '../domain/HumanProfile.usecases';
import {
  CreateHumanProfileDTO,
  EditHumanProfileDTO,
  GetHumanProfileDTO,
  DeleteHumanProfileDTO,
} from '../domain/IHumanProfile.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateHumanProfileSchema,
  EditHumanProfileSchema,
} from '../domain/HumanProfile.schema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('humanProfile')
@ApiTags('Human profile')
export class HumanProfileController {
  constructor(private _useCases: HumanProfileUseCases) {}

  @Post()
  @ApiOperation({ summary: "Create Human's profile" })
  @ApiBody({ schema: CreateHumanProfileSchema as SchemaObject })
  @ApiCreatedResponse({ description: 'Profile successfully created' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async createProfile(@Body() dto: CreateHumanProfileDTO) {
    return await this._useCases.createProfile(dto);
  }

  @Put()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: "Update Human's profile data",
    description: 'Valid token with Role.Human is required',
  })
  @ApiBody({
    schema: EditHumanProfileSchema as SchemaObject,
    description: 'Besides ID, at least one another property is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Profile successfully edited' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async editProfile(
    @Body() dto: EditHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  @Roles({ roles: [Role.Human], optional: true })
  @ApiOperation({
    summary: "Retrieve Human's profile",
    description: 'Optional valid token with Role.Human can be given',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Successfully retrieved Human's profile" })
  @ApiNotFoundResponse({ description: "Human's profile not found" })
  public async getProfile(
    @Param() dto: GetHumanProfileDTO,
    @HumanId(false) humanId: string,
  ) {
    return await this._useCases.getProfile(dto, humanId);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: "Delete Human's profile",
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully executed request for deletion' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async deleteProfile(
    @Param() dto: DeleteHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
