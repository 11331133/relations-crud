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
  const mockedId = faker.datatype.uuid();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('CreateRelation() method', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.createRelation({ friendId: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.createRelation(
          { friendId: 'abdc' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('persists relation when DTO is valid', async () => {
      await useCases.createRelation(
        { friendId: mockedId },
        HumanProfileEntityMock,
      );

      expect(IHasFriendRelRepositoryMock.persist).toHaveBeenCalled();
    });
  });

  describe('DeleteRelation() method', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation({ friendId: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation(
          { friendId: 'abdc' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('delete relation when DTO is valid', async () => {
      await useCases.deleteRelation(
        { friendId: mockedId },
        HumanProfileEntityMock,
      );

      expect(IHasFriendRelRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});
