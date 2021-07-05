import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  CreateLovesHumanRelationDTO,
  DeleteLovesHumanRelationDTO,
  EditLovesHumanRelationDTO,
} from '../../../domain/LovesHuman/ILovesHuman.dto';
import { LovesHumanRelationUseCases } from '../../../domain/LovesHuman/LovesHuman.usecases';
import { Role, Roles } from '../common/Roles.decorator';
import { PetId } from '../common/UserParam.decorator';

@Controller('lovesHuman')
export class LovesHumanController {
  constructor(private _useCases: LovesHumanRelationUseCases) {}

  @Post('createRelation')
  @Roles({ roles: [Role.Pet] })
  public async createRelation(
    @Body() dto: CreateLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.createRelation(dto, petId);
  }

  @Put('editRelation')
  @Roles({ roles: [Role.Pet] })
  public async editRelation(
    @Body() dto: EditLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.editRelation(dto, petId);
  }

  @Delete('deleteRelation/:humanId')
  @Roles({ roles: [Role.Pet] })
  public async deleteRelation(
    @Param() dto: DeleteLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.deleteRelation(dto, petId);
  }
}
