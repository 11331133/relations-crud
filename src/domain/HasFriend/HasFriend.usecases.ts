import { IValidate } from '../common/IValidate';
import { HasFriendRelation } from './HasFriend.relation';
import {
  CreateHasFriendRelationDTO,
  DeleteHasFriendRelationDTO,
} from './HasFriend.dto';
import {
  CreateHasFriendRelationSchema,
  DeleteHasFriendRelationSchema,
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
}
