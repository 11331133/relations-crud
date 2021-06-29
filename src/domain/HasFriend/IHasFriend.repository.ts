import { IRelationRepository } from '../common/IRelationRepository';
import { HasFriendRelation } from './HasFriend.relation';

export interface IHasFriendRelRepository
  extends IRelationRepository<HasFriendRelation> {
  getAllFriends(humanId: string): Promise<HasFriendRelation[]>;
  isFriend(userId: string, friendId: string): Promise<boolean>;
}
