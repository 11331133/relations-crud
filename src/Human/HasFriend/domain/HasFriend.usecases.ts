import { HasFriendRelation } from './HasFriend.relation';
import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
  GetAllFriendsDTO,
} from './HasFriend.dto';
import {
  CreateHasFriendRelationSchema,
  DeleteHasFriendRelationSchema,
  GetAllFriendsSchema,
} from './HasFriend.schema';
import { IValidate } from '../../../_common/domain/IValidate';
import { Code, failMessage, successMessage } from '../../../_common/domain/ReturnMessage';
import { IHasFriendRelRepository } from './IHasFriend.repository';

export class HasFriendRelationsUseCases {
  constructor(
    private _relationRepository: IHasFriendRelRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(
    dto: CreateHasFriendRelationDTO,
    humanId: string,
  ) {
    this._validate(dto, CreateHasFriendRelationSchema);

    if (dto.friendId === humanId) return failMessage(Code.BAD_REQUEST);
    const relation = new HasFriendRelation(humanId, dto.friendId);

    await this._relationRepository.persist(relation);
  }

  public async deleteRelation(
    dto: DeleteHasFriendRelationDTO,
    humanId: string,
  ) {
    this._validate(dto, DeleteHasFriendRelationSchema);

    await this._relationRepository.deleteOne(humanId, dto.friendId);
  }

  public async getAllFriends(dto: GetAllFriendsDTO, humanId: string) {
    this._validate(dto, GetAllFriendsSchema);

    const canAccess =
      dto.friendId === humanId ||
      (await this._relationRepository.isFriend(dto.friendId, humanId));

    if (!canAccess) return failMessage(Code.FORBIDDEN);

    const friendRelations = await this._relationRepository.getAllFriends(
      humanId,
    );

    return successMessage({
      friendIds: friendRelations.map((relation) => relation.friendId),
    });
  }
}
