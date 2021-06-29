import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { IGenerateIdMock } from '../../common/__tests__/common.mocks';
import { HasPetRelation } from '../../HasPet/HasPet.relation';
import { IHasPetRelationRepositoryMock } from '../../HasPet/__tests__/HasPet.mocks';
import { HumanProfileEntityMock } from '../../HumanProfile/__tests__/HumanProfile.mocks';
import { PetProfile } from '../PetProfile.entity';
import { PetProfileUseCases } from '../PetProfile.usecases';
import {
  IPetProfileRepositoryMock,
  PetProfileEntityMock,
} from './PetProfile.mocks';

describe('Pet profile use cases', () => {
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
    jest.restoreAllMocks();
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

    it('return false if user allready has two pets', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [PetProfileEntityMock, PetProfileEntityMock],
      );

      const response = await useCases.createProfile(
        sampleProfile,
        HumanProfileEntityMock,
      );

      expect(response).toBeFalsy();
      expect(IPetProfileRepositoryMock.persist).not.toHaveBeenCalled();
    });
  });

  describe('EditProfile use case', () => {
    it('throw error when id is empty', async () => {
      await expect(async () => {
        await useCases.editProfile(
          { ...sampleProfile, id: '' },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('throw error when only id is specified', async () => {
      await expect(async () => {
        await useCases.editProfile({ id: mockedId }, HumanProfileEntityMock);
      }).rejects.toThrow();
    });

    it('does not edit profile if user is not owner of pet with ID from DTO', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [],
      );
      IPetProfileRepositoryMock.findOne.mockResolvedValueOnce(
        PetProfileEntityMock,
      );

      await useCases.editProfile(
        { id: mockedId, name: faker.name.firstName() },
        HumanProfileEntityMock,
      );

      expect(IHasPetRelationRepositoryMock.persist).not.toHaveBeenCalled();
      expect(IPetProfileRepositoryMock.persist).not.toHaveBeenCalled();
    });

    it('edit profile if data is valid and user is owner of pet with ID from DTO', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [new HasPetRelation(HumanProfileEntityMock.id, mockedId)],
      );
      jest.spyOn(PetProfileEntityMock, 'id', 'get').mockReturnValue(mockedId);
      IPetProfileRepositoryMock.findOne.mockResolvedValueOnce(
        PetProfileEntityMock,
      );

      await useCases.editProfile(
        { id: mockedId, name: faker.name.firstName() },
        HumanProfileEntityMock,
      );

      expect(IPetProfileRepositoryMock.merge).toHaveBeenCalled();
    });
  });

  describe('GetProfile use case', () => {
    it('throw error when id is too short', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations
        .mockReturnValueOnce([{ petId: 'abcd' }])
        .mockReturnValueOnce([{ petId: '' }]);

      await expect(async () => {
        await useCases.getProfile({ id: 'abcd' });
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.getProfile({ id: '' });
      }).rejects.toThrow();
    });

    it('returns name and birthday if data is valid', async () => {
      IPetProfileRepositoryMock.findOne.mockResolvedValueOnce(
        PetProfileEntityMock,
      );

      const response = await useCases.getProfile({
        id: PetProfileEntityMock.id,
      });

      expect(response).toStrictEqual({
        name: PetProfileEntityMock.name,
        birthday: PetProfileEntityMock.birthday,
      });
    });
  });

  describe('DeleteProfile use case', () => {
    it('throw error when id is too short', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations
        .mockReturnValueOnce([{ petId: 'abcd' }])
        .mockReturnValueOnce([{ petId: '' }]);

      await expect(async () => {
        await useCases.deleteProfile({ id: 'abcd' }, HumanProfileEntityMock);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteProfile({ id: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();
    });

    it('does not delete profile if user is not owner of pet with ID from DTO', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockReturnValueOnce(
        [],
      );

      await useCases.deleteProfile({ id: mockedId }, HumanProfileEntityMock);

      expect(IPetProfileRepositoryMock.deleteOne).not.toHaveBeenCalled();
    });

    it('delete profile if user is not owner of pet with ID from DTO', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockReturnValueOnce([
        { petId: mockedId },
      ]);

      await useCases.deleteProfile({ id: mockedId }, HumanProfileEntityMock);

      expect(IPetProfileRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});