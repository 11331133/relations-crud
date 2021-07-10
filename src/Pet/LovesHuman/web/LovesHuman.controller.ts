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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { PetId } from '../../../Auth/common/UserParam.decorator';
import {
  CreateLovesHumanRelationDTO,
  EditLovesHumanRelationDTO,
  DeleteLovesHumanRelationDTO,
} from '../domain/ILovesHuman.dto';
import {
  CreateLovesHumanRelationSchema,
  EditLovesHumanRelationSchema,
} from '../domain/LovesHuman.schema';
import { LovesHumanRelationUseCases } from '../domain/LovesHuman.usecases';

@Controller('lovesHuman')
@ApiTags("Pet's LOVES_HUMAN relation")
export class LovesHumanController {
  constructor(private _useCases: LovesHumanRelationUseCases) {}

  @Post()
  @Roles({ roles: [Role.Pet] })
  @ApiOperation({ summary: 'Create relation' })
  @ApiBody({ schema: CreateLovesHumanRelationSchema as SchemaObject })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Successfully created relation' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async createRelation(
    @Body() dto: CreateLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.createRelation(dto, petId);
  }

  @Put()
  @Roles({ roles: [Role.Pet] })
  @ApiOperation({ summary: 'Edit relation' })
  @ApiBody({ schema: EditLovesHumanRelationSchema as SchemaObject })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully edited relation' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async editRelation(
    @Body() dto: EditLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.editRelation(dto, petId);
  }

  @Delete(':humanId')
  @Roles({ roles: [Role.Pet] })
  @ApiOperation({
    summary: 'Delete relation',
    description: 'Valid token with Role.Pet is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully deleted relation' })
  public async deleteRelation(
    @Param() dto: DeleteLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.deleteRelation(dto, petId);
  }

  @Get()
  @Roles({ roles: [Role.Pet] })
  @ApiOperation({
    summary: 'Retrieve all Humans that Pet loves',
    description: 'Valid token with Role.Pet is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Successfully retrieved all Humans that Pet loves',
  })
  public async getAllHumansPetLoves(@PetId() petId: string) {
    return await this._useCases.getAllHumansPetLoves(petId);
  }
}
