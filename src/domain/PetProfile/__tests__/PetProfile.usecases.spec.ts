import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { IGenerateIdMock } from '../../common/__tests__/common.mocks';
import { IHasPetRelationRepositoryMock } from '../../HasPet/__tests__/HasPet.mocks';
import { HumanProfileEntityMock } from '../../HumanProfile/__tests__/HumanProfile.mocks';
import { PetProfile } from '../PetProfile.entity';
import { PetProfileUseCases } from '../PetProfile.usecases';
import { IPetProfileRepositoryMock } from './PetProfile.mocks';

describe.only('Pet profile use cases', () => {
  const sampleProfile = {
    name: faker.name.firstName(),
    birthday: faker.date.past().toISOString(),
  };
  const mockedId = faker.datatype.uuid();
  const useCases = new PetProfileUseCases(
    IPetProfileRepositoryMock,
    IHasPetRelationRepositoryMock,
    validate,
    IGenerateIdMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('CreateProfile use case', () => {
    it('throw error when name is empty', async () => {
      await expect(async () => {
        await useCases.createProfile(
          { ...sampleProfile, name: '' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('throw error when birthday is empty', async () => {
      await expect(async () => {
        await useCases.createProfile(
          { ...sampleProfile, birthday: '' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('persist profile in repository', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [],
      );
      IGenerateIdMock.mockResolvedValueOnce(mockedId);
      const { name, birthday } = sampleProfile;
      const expectedProfile = new PetProfile(
        name,
        new Date(birthday),
        mockedId,
      );

      await useCases.createProfile(sampleProfile, HumanProfileEntityMock);

      expect(IPetProfileRepositoryMock.persist).toHaveBeenCalledWith(
        expectedProfile,
      );
    });
  });

  describe('EditProfile use case', () => {});

  describe('GetProfile use case', () => {});

  describe('DeleteProfile use case', () => {});
});
