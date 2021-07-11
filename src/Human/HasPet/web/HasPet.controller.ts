import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HasPetRelationUseCases } from '../domain/HasPet.usecases';
import {
  CreateHasPetRelationDTO,
  DeleteHasPetRelationDTO,
} from '../domain/IHasPet.dto';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';

import { HasPetApiDocs } from './HasPet.api-docs';

@Controller('hasPet')
@ApiTags("Human's HAS_PET relation")
export class HasPetController {
  constructor(private _useCases: HasPetRelationUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @HasPetApiDocs.createRelation
  public async createRelation(
    @Body() dto: CreateHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete(':petId')
  @Roles({ roles: [Role.Human] })
  @HasPetApiDocs.deleteRelation
  public async deleteRelation(
    @Param() dto: DeleteHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get()
  @Roles({ roles: [Role.Human] })
  @HasPetApiDocs.getAllHasPetRelations
  public async getAllHasPetRelations(@HumanId() humanId: string) {
    return await this._useCases.getAllHasPetRelations(humanId);
  }
}
