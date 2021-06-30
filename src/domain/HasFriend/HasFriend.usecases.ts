import { IValidate } from '../common/IValidate';
import { HumanProfile } from '../HumanProfile/HumanProfile.entity';
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
    user: HumanProfile,
  ) {
    this._validate(dto, CreateHasFriendRelationSchema);

    const relation = new HasFriendRelation(user.id, dto.friendId);

    return await this._relationRepository.persist(relation);
  }

  public async deleteRelation(
    dto: DeleteHasFriendRelationDTO,
    user: HumanProfile,
  ) {
    this._validate(dto, DeleteHasFriendRelationSchema);

    return await this._relationRepository.deleteOne(
      user.id,
      dto.friendId,
      false,
    );
  }
}
