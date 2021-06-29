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
    describe('validation cases', () => {
      describe('must throw when', () => {
        test.each([
          ['Name is empty', { ...sampleProfileDTO, name: '' }],
          ['Surname is empty', { ...sampleProfileDTO, surname: '' }],
          ['Middlename is empty', { ...sampleProfileDTO, middlename: '' }],
          ['Birthday is empty', { ...sampleProfileDTO, birthday: '' }],
        ])('%s', async (description, unvalidDTO) => {
          await expect(async () => {
            await useCases.createProfile(unvalidDTO);
          }).rejects.toThrow();
        });
      });

      it('must not throw when all necessary data is given', async () => {
        await useCases.createProfile(sampleProfileDTO);

        expect(1).toBe(1); // https://github.com/facebook/jest/issues/1700
      });
    });

    it('Persist profile in repository', async () => {
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
    describe('validation cases: must throw when', () => {
      test.each([
        ['Id is empty', { ...sampleProfileDTO, id: '' }],
        ['Only id is given', { id: mockedId, name: '' }],
      ])('%s', async (description, unvalidDTO) => {
        await expect(async () => {
          await useCases.editProfile(unvalidDTO, HumanProfileEntityMock);
        }).rejects.toThrow();
      });
    });

    it('Merge profile in repository', async () => {
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

  describe('GetProfile use case', () => {});

  describe('DeleteProfile use case', () => {});
});
