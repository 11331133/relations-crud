import { IRepository } from '../common/IRepository';
import { HasFriendRelation } from './HasFriend.relation';

export interface IHasFriendRelRepository
  extends IRepository<HasFriendRelation> {
  getAllFriends(humanId: string): Promise<HasFriendRelation[]>;
  isFriend(userId: string, friendId: string): Promise<boolean>;
}
