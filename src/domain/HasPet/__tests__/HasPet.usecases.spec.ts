import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { HasPetRelationUseCases } from '../HasPet.usecases';
import { IHasPetRelationRepositoryMock } from './HasPet.mocks';

describe('HasPet usecases', () => {
  const useCases = new HasPetRelationUseCases(
    IHasPetRelationRepositoryMock,
    validate,
  );

  const sampleRelation = {
    petId: faker.datatype.uuid(),
  };

  const mockedId = faker.datatype.uuid();

  describe('createRelation method()', () => {
    it('throw error when petId is too short', async () => {
      await expect(async () => {
        await useCases.createRelation({ petId: '' }, mockedId);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.createRelation(
          { petId: faker.datatype.uuid().slice(0, 4) },
          mockedId,
        );
      }).rejects.toThrow();
    });

    it('persists relation when data is valid', async () => {
      await useCases.createRelation(sampleRelation, mockedId);

      expect(IHasPetRelationRepositoryMock.persist).toHaveBeenCalled();
    });
  });

  describe('deleteRelation method()', () => {
    it('throw error when petId is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation({ petId: '' }, mockedId);
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation(
          { petId: faker.datatype.uuid().slice(0, 4) },
          mockedId,
        );
      }).rejects.toThrow();
    });

    it('deletes relation when data is valid', async () => {
      await useCases.deleteRelation(sampleRelation, mockedId);

      expect(IHasPetRelationRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});
