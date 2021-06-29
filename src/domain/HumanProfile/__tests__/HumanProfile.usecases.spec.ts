import * as faker from 'faker';
import { HumanProfileUseCases } from '../HumanProfile.usecases';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { HumanProfile } from '../HumanProfile.entity';
import {
  HumanProfileEntityMock,
  IHumanProfileRepositoryMock,
} from './HumanProfile.mocks';
import { IHasFriendRelRepositoryMock } from '../../HasFriend/__tests__/HasFriend.mocks';
import { IGenerateIdMock } from '../../common/__tests__/common.mocks';

describe('HumanProfile use cases', () => {
  const mockedId = faker.datatype.uuid();
  let sampleProfileDTO = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    middlename: faker.name.middleName(),
    birthday: faker.date.past().toISOString(),
  };

  let useCases = new HumanProfileUseCases(
    IHumanProfileRepositoryMock,
    IHasFriendRelRepositoryMock,
    validate,
    IGenerateIdMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('CreateProfile use case', () => {
    describe('throw error when', () => {
      test.each([
        ['name is empty', { ...sampleProfileDTO, name: '' }],
        ['surname is empty', { ...sampleProfileDTO, surname: '' }],
        ['middlename is empty', { ...sampleProfileDTO, middlename: '' }],
        ['birthday is empty', { ...sampleProfileDTO, birthday: '' }],
      ])('%s', async (description, unvalidDTO) => {
        await expect(async () => {
          await useCases.createProfile(unvalidDTO);
        }).rejects.toThrow();
      });
    });

    it('does not throw error when all data given in valid format', async () => {
      await useCases.createProfile(sampleProfileDTO);

      expect(1).toBe(1); // https://github.com/facebook/jest/issues/1700
    });

    it('persist profile in repository', async () => {
      IGenerateIdMock.mockReturnValueOnce(mockedId);
      const { name, middlename, surname, birthday } = sampleProfileDTO;
      const expectedProfile = new HumanProfile(
        name,
        middlename,
        surname,
        new Date(birthday),
        mockedId,
      );

      await useCases.createProfile(sampleProfileDTO);

      expect(IHumanProfileRepositoryMock.persist).toHaveBeenCalledWith(
        expectedProfile,
      );
    });
  });

  describe('EditProfile use case', () => {
    it('throw error when id is empty', async () => {
      await expect(async () => {
        await useCases.editProfile(
          { ...sampleProfileDTO, id: '' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('throw error when only id is given', async () => {
      await expect(async () => {
        await useCases.editProfile(
          { id: mockedId, name: '' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('merge profile in repository', async () => {
      IGenerateIdMock.mockReturnValueOnce(mockedId);
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      const { name, middlename, surname, birthday } = sampleProfileDTO;
      const expectedProfile = new HumanProfile(
        name,
        middlename,
        surname,
        new Date(birthday),
        HumanProfileEntityMock.id,
      );

      await useCases.editProfile(
        { ...sampleProfileDTO, id: HumanProfileEntityMock.id },
        HumanProfileEntityMock,
      );

      expect(IHumanProfileRepositoryMock.merge).toHaveBeenCalledWith(
        expectedProfile,
      );
    });
  });

  describe('GetProfile use case', () => {
    it('throw error when id is empty', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: '' });
      }).rejects.toThrow();
    });

    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: 'abcd' });
      }).rejects.toThrow();
    });

    it("return birthday if profile's owner has HAS_FRIEND relation with user", async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(true);

      const profile = await useCases.getProfile(
        { id: mockedId },
        HumanProfileEntityMock,
      );

      expect(profile).toStrictEqual({
        name: HumanProfileEntityMock.name,
        middlename: HumanProfileEntityMock.middlename,
        surname: HumanProfileEntityMock.surname,
        birthday: HumanProfileEntityMock.birthday,
      });
    });

    it("does not return birthday if profile's owner has not HAS_FRIEND relation with user", async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(false);

      const profile = await useCases.getProfile(
        { id: mockedId },
        HumanProfileEntityMock,
      );

      expect(profile).toStrictEqual({
        name: HumanProfileEntityMock.name,
        middlename: HumanProfileEntityMock.middlename,
        surname: HumanProfileEntityMock.surname,
        birthday: null,
      });
    });

    it('does not return birthday if users profile is not given', async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(true);

      const profile = await useCases.getProfile({ id: mockedId });

      expect(profile).toStrictEqual({
        name: HumanProfileEntityMock.name,
        middlename: HumanProfileEntityMock.middlename,
        surname: HumanProfileEntityMock.surname,
        birthday: null,
      });
    });
  });

  describe('DeleteProfile use case', () => {
    it('throw error when id is empty', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();
    });

    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: 'abcd' }, HumanProfileEntityMock);
      }).rejects.toThrow();
    });

    it("return false when user want to delete another person's profile", async () => {
      const result = await useCases.deleteProfile(
        { id: faker.datatype.uuid() },
        HumanProfileEntityMock,
      );

      expect(result).toBe(false);
      expect(IHumanProfileRepositoryMock.deleteOne).not.toBeCalled();
    });

    it('return false when user profile is not given', async () => {
      const result = await useCases.deleteProfile({
        id: faker.datatype.uuid(),
      });

      expect(result).toBe(false);
      expect(IHumanProfileRepositoryMock.deleteOne).not.toBeCalled();
    });

    it('deletes profile if user profile is given and id is correct', async () => {
      await useCases.deleteProfile(
        { id: HumanProfileEntityMock.id },
        HumanProfileEntityMock,
      );

      expect(IHumanProfileRepositoryMock.deleteOne).toBeCalledWith(
        HumanProfileEntityMock.id,
      );
    });
  });
});
