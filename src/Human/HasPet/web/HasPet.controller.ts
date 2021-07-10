import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HasPetRelationUseCases } from '../domain/HasPet.usecases';
import {
  CreateHasPetRelationDTO,
  DeleteHasPetRelationDTO,
} from '../domain/IHasPet.dto';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';

@Controller('hasPet')
export class HasPetController {
  constructor(private _useCases: HasPetRelationUseCases) {}

  @Post('createRelation')
  @Roles({ roles: [Role.Human] })
  public async createRelation(
    @Body() dto: CreateHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete(':petId')
  @Roles({ roles: [Role.Human] })
  public async deleteRelation(
    @Param() dto: DeleteHasPetRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get('getAllHasPetRelations')
  @Roles({ roles: [Role.Human] })
  public async getAllHasPetRelations(@HumanId() humanId: string) {
    return await this._useCases.getAllHasPetRelations(humanId);
  }
}
