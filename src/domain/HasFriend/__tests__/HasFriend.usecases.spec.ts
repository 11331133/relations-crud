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
  });

  describe('DeleteRelation() method', () => {});
});
