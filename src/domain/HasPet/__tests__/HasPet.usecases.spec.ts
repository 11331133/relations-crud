import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { HumanProfileEntityMock } from '../../HumanProfile/__tests__/HumanProfile.mocks';
import { HasPetRelationUseCases } from '../HasPetRel.usecases';
import { IHasPetRelationRepositoryMock } from './HasPet.mocks';

describe('HasPet usecases', () => {
  const useCases = new HasPetRelationUseCases(
    IHasPetRelationRepositoryMock,
    validate,
  );

  const sampleRelation = {
    petId: faker.datatype.uuid(),
  };

  describe('createRelation method()', () => {
    it('throw error when petId is too short', async () => {
      await expect(async () => {
        await useCases.createRelation({ petId: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.createRelation(
          { petId: faker.datatype.uuid().slice(0, 4) },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('persists relation when data is valid', async () => {
      await useCases.createRelation(sampleRelation, HumanProfileEntityMock);

      expect(IHasPetRelationRepositoryMock.persist).toHaveBeenCalled();
    });
  });

  describe('deleteRelation method()', () => {
    it('throw error when petId is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation({ petId: '' }, HumanProfileEntityMock);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation(
          { petId: faker.datatype.uuid().slice(0, 4) },
          HumanProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('deletes relation when data is valid', async () => {
      await useCases.deleteRelation(sampleRelation, HumanProfileEntityMock);

      expect(IHasPetRelationRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});
