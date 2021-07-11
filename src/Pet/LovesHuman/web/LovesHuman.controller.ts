import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { PetId } from '../../../Auth/common/UserParam.decorator';
import {
  CreateLovesHumanRelationDTO,
  EditLovesHumanRelationDTO,
  DeleteLovesHumanRelationDTO,
} from '../domain/ILovesHuman.dto';
import { LovesHumanRelationUseCases } from '../domain/LovesHuman.usecases';
import { LovesHumanApiDocs } from './LovesHuman.api-docs';

@Controller('lovesHuman')
@ApiTags("Pet's LOVES_HUMAN relation")
export class LovesHumanController {
  constructor(private _useCases: LovesHumanRelationUseCases) {}

  @Post()
  @Roles({ roles: [Role.Pet] })
  @LovesHumanApiDocs.createRelation
  public async createRelation(
    @Body() dto: CreateLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.createRelation(dto, petId);
  }

  @Put()
  @Roles({ roles: [Role.Pet] })
  @LovesHumanApiDocs.editRelation
  public async editRelation(
    @Body() dto: EditLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.editRelation(dto, petId);
  }

  @Delete(':humanId')
  @Roles({ roles: [Role.Pet] })
  @LovesHumanApiDocs.deleteRelation
  public async deleteRelation(
    @Param() dto: DeleteLovesHumanRelationDTO,
    @PetId() petId: string,
  ) {
    return await this._useCases.deleteRelation(dto, petId);
  }

  @Get()
  @Roles({ roles: [Role.Pet] })
  @LovesHumanApiDocs.getAllHumansPetLoves
  public async getAllHumansPetLoves(@PetId() petId: string) {
    return await this._useCases.getAllHumansPetLoves(petId);
  }
}
