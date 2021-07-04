import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
} from '../../../domain/HasFriend/HasFriend.dto';
import { HasFriendRelationsUseCases } from '../../../domain/HasFriend/HasFriend.usecases';
import { Role, Roles } from '../common/Roles.decorator';
import { HumanId } from '../common/UserParam.decorator';

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
}
