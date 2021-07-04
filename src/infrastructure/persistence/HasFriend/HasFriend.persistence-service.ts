import { Injectable } from '@nestjs/common';
import { HasFriendRelation } from '../../../domain/HasFriend/HasFriend.relation';
import { IHasFriendRelRepository } from '../../../domain/HasFriend/IHasFriend.repository';
import { Neo4jClient } from '../common/neo4jclient';

@Injectable()
export class HasFriendPersistenceService implements IHasFriendRelRepository {
  constructor(private _neo4jclient: Neo4jClient) {}

  public async persist(relation: HasFriendRelation): Promise<boolean> {
    const query =
      'MATCH (user:HumanProfile {id: $userId}), ' +
      '(friend:HumanProfile {id: $friendId}) ' +
      'MERGE (user)-[relation:HAS_FRIEND]->(friend) ' +
      'RETURN relation';
    const params = {
      userId: relation.whoHasFriend,
      friendId: relation.friendId,
    };

    const result = await this._neo4jclient.write(query, params);
    return true;
  }

  public async deleteOne(from: string, to: string): Promise<boolean> {
    const query =
      'MATCH (:HumanProfile {id: $userId})' +
      '-[relation:HAS_FRIEND]->' +
      '(:HumanProfile (id: $friendId)) ' +
      'DELETE relation';
    const params = { userId: from, friendId: to };

    await this._neo4jclient.write(query, params);
    return true;
  }

  public async isFriend(userId: string, friendId: string): Promise<boolean> {
    const query =
      'MATCH (friend:HumanProfile {id: $friendId})' +
      '-[relation:HAS_FRIEND]->(user:HumanProfile {id: $userId}) ' +
      'RETURN relation';
    const params = { userId, friendId };

    const result = await this._neo4jclient.read(query, params);

    return true;
  }

  public async getAllFriends(humanId: string): Promise<HasFriendRelation[]> {
    const query =
      'MATCH (user:HumanProfile {id: $userId})' +
      '-[:HAS_FRIEND]->(friend) ' +
      'RETURN friend ';
    const params = { id: humanId };

    const result = await this._neo4jclient.read(query, params);

    return [];
  }
}