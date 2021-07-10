import * as faker from 'faker';
import { successMessage, failMessage, Code } from '../../../../_common/domain/ReturnMessage';
import { IGenerateIdMock } from '../../../../_common/domain/__tests__/common.mocks';
import { validate } from '../../../../_common/infrastructure/adapters/validate.adapter';
import { IHasFriendRelRepositoryMock } from '../../../HasFriend/domain/__tests__/HasFriend.mocks';
import { HumanProfile } from '../HumanProfile.entity';
import { HumanProfileUseCases } from '../HumanProfile.usecases';
import { IHumanProfileRepositoryMock, HumanProfileEntityMock } from './HumanProfile.mocks';


describe('HumanProfile use cases', () => {
  const mockedId = faker.datatype.uuid();
  const mockedId2 = faker.datatype.uuid();

  const sampleProfile = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    middlename: faker.name.middleName(),
    birthday: faker.date.past().toISOString(),
  };

  const useCases = new HumanProfileUseCases(
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
        ['name is empty', { ...sampleProfile, name: '' }],
        ['surname is empty', { ...sampleProfile, surname: '' }],
        ['middlename is empty', { ...sampleProfile, middlename: '' }],
        ['birthday is empty', { ...sampleProfile, birthday: '' }],
      ])('%s', async (description, unvalidDTO) => {
        await expect(async () => {
          await useCases.createProfile(unvalidDTO);
        }).rejects.toThrow();
      });
    });

    it('does not throw error when all data given in valid format', async () => {
      await useCases.createProfile(sampleProfile);

      expect(1).toBe(1); // https://github.com/facebook/jest/issues/1700
    });

    it('persist profile in repository', async () => {
      IGenerateIdMock.mockReturnValueOnce(mockedId);
      const { name, middlename, surname, birthday } = sampleProfile;
      const expectedProfile = new HumanProfile(
        name,
        middlename,
        surname,
        new Date(birthday),
        mockedId,
      );

      await useCases.createProfile(sampleProfile);

      expect(IHumanProfileRepositoryMock.persist).toHaveBeenCalledWith(
        expectedProfile,
      );
    });
  });

  describe('EditProfile use case', () => {
    it('throw error when id is empty', async () => {
      await expect(async () => {
        await useCases.editProfile({ ...sampleProfile, id: '' }, mockedId);
      }).rejects.toThrow();
    });

    it('throw error when only id is given', async () => {
      await expect(async () => {
        await useCases.editProfile({ id: mockedId, name: '' }, mockedId2);
      }).rejects.toThrow();
    });

    it('merge profile in repository', async () => {
      IGenerateIdMock.mockReturnValueOnce(mockedId);
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      const { name, middlename, surname, birthday } = sampleProfile;
      const expectedProfile = new HumanProfile(
        name,
        middlename,
        surname,
        new Date(birthday),
        HumanProfileEntityMock.id,
      );

      await useCases.editProfile(
        { ...sampleProfile, id: HumanProfileEntityMock.id },
        HumanProfileEntityMock.id,
      );

      expect(IHumanProfileRepositoryMock.merge).toHaveBeenCalledWith(
        expectedProfile,
      );
    });
  });

  describe('GetProfile use case', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: 'abcd' });
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.getProfile({ id: '' });
      }).rejects.toThrow();
    });

    it("return birthday if profile's owner has HAS_FRIEND relation with user", async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(true);

      const profile = await useCases.getProfile({ id: mockedId }, mockedId2);

      expect(profile).toStrictEqual(
        successMessage({
          name: HumanProfileEntityMock.name,
          middlename: HumanProfileEntityMock.middlename,
          surname: HumanProfileEntityMock.surname,
          birthday: HumanProfileEntityMock.birthday,
        }),
      );
    });

    it("does not return birthday if profile's owner has not HAS_FRIEND relation with user", async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(false);

      const profile = await useCases.getProfile({ id: mockedId }, mockedId2);

      expect(profile).toStrictEqual(
        successMessage({
          name: HumanProfileEntityMock.name,
          middlename: HumanProfileEntityMock.middlename,
          surname: HumanProfileEntityMock.surname,
          birthday: null,
        }),
      );
    });

    it('does not return birthday if users profile is not given', async () => {
      IHumanProfileRepositoryMock.findOne.mockResolvedValueOnce(
        HumanProfileEntityMock,
      );
      IHasFriendRelRepositoryMock.isFriend.mockResolvedValueOnce(true);

      const profile = await useCases.getProfile({ id: mockedId });

      expect(profile).toStrictEqual(
        successMessage({
          name: HumanProfileEntityMock.name,
          middlename: HumanProfileEntityMock.middlename,
          surname: HumanProfileEntityMock.surname,
          birthday: null,
        }),
      );
    });
  });

  describe('DeleteProfile use case', () => {
    it('throw error when id is too short', async () => {
      await expect(async () => {
        await useCases.getProfile({ id: 'abcd' }, mockedId);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.getProfile({ id: '' }, mockedId);
      }).rejects.toThrow();
    });

    it("return fail message when user want to delete another person's profile", async () => {
      const result = await useCases.deleteProfile(
        { id: faker.datatype.uuid() },
        mockedId,
      );

      expect(result).toStrictEqual(failMessage(Code.FORBIDDEN));
      expect(IHumanProfileRepositoryMock.deleteOne).not.toBeCalled();
    });

    it('return fail message when user profile is not given', async () => {
      const result = await useCases.deleteProfile(
        {
          id: faker.datatype.uuid(),
        },
        mockedId,
      );

      expect(result).toStrictEqual(failMessage(Code.FORBIDDEN));
      expect(IHumanProfileRepositoryMock.deleteOne).not.toBeCalled();
    });

    it('deletes profile if user profile is given and id is correct', async () => {
      await useCases.deleteProfile(
        { id: HumanProfileEntityMock.id },
        HumanProfileEntityMock.id,
      );

      expect(IHumanProfileRepositoryMock.deleteOne).toBeCalledWith(
        HumanProfileEntityMock.id,
      );
    });
  });
});
