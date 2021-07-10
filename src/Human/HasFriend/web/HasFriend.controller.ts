import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
  GetAllFriendsDTO,
} from '../domain/HasFriend.dto';
import { HasFriendRelationsUseCases } from '../domain/HasFriend.usecases';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteHasFriendRelationSchema } from '../domain/HasFriend.schema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('hasFriend')
@ApiTags("Human's HAS_FRIEND relation")
export class HasFriendController {
  constructor(private _useCases: HasFriendRelationsUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Create relation',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully created relation' })
  @ApiBadRequestResponse({ description: 'Cannot create circular relation' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async createRelation(
    @Body() dto: CreateHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createRelation(dto, humanId);
  }

  @Delete()
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Delete relation',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBody({ schema: DeleteHasFriendRelationSchema as SchemaObject })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully deleted relation' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async deleteRelation(
    @Body() dto: DeleteHasFriendRelationDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteRelation(dto, humanId);
  }

  @Get(':friendId')
  @Roles({ roles: [Role.Human] })
  @ApiOperation({
    summary: 'Retrieve all friends',
    description: 'Valid token with Role.Human is required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully retrieved friends list' })
  @ApiForbiddenResponse({ description: 'Validation error or access denied' })
  public async getAllFriends(
    @Param() dto: GetAllFriendsDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.getAllFriends(dto, humanId);
  }
}
