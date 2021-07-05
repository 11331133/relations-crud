import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  CreateLoveHumanRelationDTO,
  DeleteLoveHumanRelationDTO,
  EditLoveHumanRelationDTO,
} from '../../../domain/LoveHuman/ILoveHuman.dto';
import { LoveHumanRelationUseCases } from '../../../domain/LoveHuman/LoveHuman.usecases';
import { Role, Roles } from '../common/Roles.decorator';
import { PetId } from '../common/UserParam.decorator';

@Controller('loveHuman')
export class LoveHumanController {
  constructor(private _useCases: LoveHumanRelationUseCases) {}

  @Post('createRelation')
  @Roles({ roles: [Role.Pet] })
  public async createRelation(
    @Body() dto: CreateLoveHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.createRelation(dto, petId);
  }

  @Put('editRelation')
  @Roles({ roles: [Role.Pet] })
  public async editRelation(
    @Body() dto: EditLoveHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.editRelation(dto, petId);
  }

  @Delete('deleteRelation/:humanId')
  @Roles({ roles: [Role.Pet] })
  public async deleteRelation(
    @Param() dto: DeleteLoveHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.deleteRelation(dto, petId);
  }
}
