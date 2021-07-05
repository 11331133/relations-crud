import * as faker from 'faker';

import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { HumanProfileEntityMock } from '../../HumanProfile/__tests__/HumanProfile.mocks';
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

    it('returns false if trying to create relationship with itself', async () => {
      const result = await useCases.createRelation(
        { friendId: mockedId1 },
        mockedId1,
      );

      expect(result).toBeFalsy();
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
});
