import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
  GetAllFriendsDTO,
} from '../domain/HasFriend.dto';
import { HasFriendRelationsUseCases } from '../domain/HasFriend.usecases';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';

@Controller('hasFriend')
export class HasFriendController {
  constructor(private _useCases: HasFriendRelationsUseCases) {}

  @Post('createRelation')
  @Roles({ roles: [Role.Human] })
  public async createRelation(
    @Body() dto: CreateHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete('deleteRelation')
  @Roles({ roles: [Role.Human] })
  public async deleteRelation(
    @Body() dto: DeleteHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get('getAllFriends/:friendId')
  @Roles({ roles: [Role.Human] })
  public async getAllFriends(
    @Param() dto: GetAllFriendsDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.getAllFriends(dto, humanId);
  }
}
