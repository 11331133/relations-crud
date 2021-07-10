import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { PetId } from '../../../Auth/common/UserParam.decorator';
import {
  CreateLovesHumanRelationDTO,
  EditLovesHumanRelationDTO,
  DeleteLovesHumanRelationDTO,
} from '../domain/ILovesHuman.dto';
import { LovesHumanRelationUseCases } from '../domain/LovesHuman.usecases';

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

  @Get('getAllHumansPetLoves')
  @Roles({ roles: [Role.Pet] })
  public async getAllHumansPetLoves(@PetId() petId: string) {
    return await this._useCases.getAllHumansPetLoves(petId);
  }
}
