import * as faker from 'faker';
import {
  Code,
  failMessage,
  successMessage,
} from '../../../../_common/domain/ReturnMessage';

import { validate } from '../../../../_common/infrastructure/adapters/validate.adapter';
import { HasFriendRelationsUseCases } from '../HasFriend.usecases';
import { IHasFriendRelRepositoryMock } from './HasFriend.mocks';

describe('HasFriend Relation UseCases', () => {
  const useCases = new HasFriendRelationsUseCases(
    IHasFriendRelRepositoryMock,
    validate,
  );
  const mockedId1 = faker.datatype.uuid();
  const mockedId2 = faker.datatype.uuid();
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('CreateRelation() method', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.createRelation({ friendId: '' }, mockedId1);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.createRelation({ friendId: 'abdc' }, mockedId1);
      }).rejects.toThrow();
    });

    it('persists relation when DTO is valid', async () => {
      await useCases.createRelation({ friendId: mockedId1 }, mockedId2);

      expect(IHasFriendRelRepositoryMock.persist).toHaveBeenCalled();
    });

    it('returns failMessage if trying to create relationship with itself', async () => {
      const result = await useCases.createRelation(
        { friendId: mockedId1 },
        mockedId1,
      );

      expect(result).toStrictEqual(failMessage(Code.BAD_REQUEST));
    });
  });

  describe('DeleteRelation() method', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation({ friendId: '' }, mockedId1);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation({ friendId: 'abdc' }, mockedId1);
      }).rejects.toThrow();
    });

    it('delete relation when DTO is valid', async () => {
      await useCases.deleteRelation({ friendId: mockedId1 }, mockedId2);

      expect(IHasFriendRelRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });

  describe('GetAllFriends method', () => {
    const friendListMock = Array(5)
      .fill(5)
      .map(() => ({
        friendId: faker.datatype.uuid(),
      }));

    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.getAllFriends({ humanId: '' }, mockedId1);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.getAllFriends({ humanId: 'abcd' }, mockedId1);
      }).rejects.toThrow();
    });

    it("returns user's own friends", async () => {
      IHasFriendRelRepositoryMock.getAllFriends.mockResolvedValueOnce(
        friendListMock,
      );

      const result = await useCases.getAllFriends(
        { humanId: mockedId1 },
        mockedId1,
      );

      expect(result).toStrictEqual(
        successMessage({
          friendIds: friendListMock.map((friend) => friend.friendId),
        }),
      );
    });

    it("returns user's friend's friends", async () => {
      IHasFriendRelRepositoryMock.getAllFriends.mockResolvedValueOnce(
        friendListMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(true);

      const result = await useCases.getAllFriends(
        { humanId: mockedId1 },
        mockedId2,
      );

      expect(result).toStrictEqual(
        successMessage({
          friendIds: friendListMock.map((friend) => friend.friendId),
        }),
      );
    });

    it('if person does not have HAS_FRIEND relation with user, does not return friend list', async () => {
      IHasFriendRelRepositoryMock.getAllFriends.mockResolvedValueOnce(
        friendListMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(false);

      const result = await useCases.getAllFriends(
        { humanId: mockedId1 },
        mockedId2,
      );

      expect(result).toStrictEqual(failMessage(Code.FORBIDDEN));
    });
  });
});
