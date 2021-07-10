import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HasPetRelationUseCases } from '../domain/HasPet.usecases';
import {
  CreateHasPetRelationDTO,
  DeleteHasPetRelationDTO,
} from '../domain/IHasPet.dto';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiMethodNotAllowedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHasPetRelationSchema } from '../domain/HasPet.schema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('hasPet')
@ApiTags("Human's HAS_PET relation")
export class HasPetController {
  constructor(private _useCases: HasPetRelationUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Create relation',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBody({ schema: CreateHasPetRelationSchema as SchemaObject })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully created relation' })
  @ApiMethodNotAllowedResponse({ description: 'Too many pets allready exists' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async createRelation(
    @Body() dto: CreateHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete(':petId')
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Delete relation',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully deleted relation' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async deleteRelation(
    @Param() dto: DeleteHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Retrieve all Pets that Human with given ID has',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved all relations' })
  public async getAllHasPetRelations(@HumanId() humanId: string) {
    return await this._useCases.getAllHasPetRelations(humanId);
  }
}
