import { Injectable } from '@nestjs/common';
import { Neo4jClient } from '../../../_common/infrastructure/persistence/Neo4j.client';
import { HasFriendRelation } from '../domain/HasFriend.relation';
import { IHasFriendRelRepository } from '../domain/IHasFriend.repository';

@Injectable()
export class HasFriendPersistenceService implements IHasFriendRelRepository {
  constructor(private _neo4jclient: Neo4jClient) {}

  public async persist(relation: HasFriendRelation): Promise<void> {
    const query =
      'MATCH (user:HumanProfile {id: $userId}), ' +
      '(friend:HumanProfile {id: $friendId}) ' +
      'MERGE (user)-[:HAS_FRIEND]->(friend)';
    const params = {
      userId: relation.whoHasFriend,
      friendId: relation.friendId,
    };

    await this._neo4jclient.write(query, params);
  }

  public async deleteOne(from: string, to: string): Promise<void> {
    const query =
      'MATCH (:HumanProfile {id: $userId})' +
      '-[relation:HAS_FRIEND]->' +
      '(:HumanProfile {id: $friendId}) ' +
      'DELETE relation';
    const params = { userId: from, friendId: to };

    await this._neo4jclient.write(query, params);
  }

  public async isFriend(userId: string, friendId: string): Promise<boolean> {
    const query =
      'MATCH (:HumanProfile {id: $userId})' +
      '-[relation:HAS_FRIEND]->(:HumanProfile {id: $friendId}) ' +
      'RETURN relation';
    const params = { userId, friendId };

    const result = await this._neo4jclient.read(query, params);

    return result.records.length > 0;
  }

  public async getAllFriends(humanId: string): Promise<HasFriendRelation[]> {
    const query =
      'MATCH (user:HumanProfile {id: $userId})' +
      '-[:HAS_FRIEND]->(friend) ' +
      'RETURN friend.id';
    const params = { userId: humanId };

    const response = await this._neo4jclient.read(query, params);

    return response.records.map(
      (record) => new HasFriendRelation(humanId, record.get('friend.id')),
    );
  }
}
