import { IValidate } from '../common/IValidate';
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

    if (dto.friendId === humanId) return false;
    const relation = new HasFriendRelation(humanId, dto.friendId);

    return await this._relationRepository.persist(relation);
  }

  public async deleteRelation(
    dto: DeleteHasFriendRelationDTO,
    humanId: string,
  ) {
    this._validate(dto, DeleteHasFriendRelationSchema);

    return await this._relationRepository.deleteOne(humanId, dto.friendId);
  }

  public async getAllFriends(dto: GetAllFriendsDTO, humanId: string) {
    this._validate(dto, GetAllFriendsSchema);

    const canAccess =
      (await this._relationRepository.isFriend(dto.friendId, humanId)) ||
      dto.friendId === humanId;

    if (!canAccess) return false;

    const friendRelations = await this._relationRepository.getAllFriends(
      humanId,
    );

    return {
      friendIds: friendRelations.map((relation) => relation.friendId),
    };
  }
}
