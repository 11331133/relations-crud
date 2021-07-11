import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
  GetAllFriendsDTO,
} from '../domain/HasFriend.dto';
import { HasFriendRelationsUseCases } from '../domain/HasFriend.usecases';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import { HasFriendApiDocs } from './HasFriend.api-docs';

@Controller('hasFriend')
@ApiTags("Human's HAS_FRIEND relation")
export class HasFriendController {
  constructor(private _useCases: HasFriendRelationsUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @HasFriendApiDocs.createRelation
  public async createRelation(
    @Body() dto: CreateHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete()
  @Roles({ roles: [Role.Human] })
  @HasFriendApiDocs.deleteRelation
  public async deleteRelation(
    @Body() dto: DeleteHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get(':humanId')
  @Roles({ roles: [Role.Human] })
  @HasFriendApiDocs.getAllFriends
  public async getAllFriends(
    @Param() dto: GetAllFriendsDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.getAllFriends(dto, humanId);
  }
}
