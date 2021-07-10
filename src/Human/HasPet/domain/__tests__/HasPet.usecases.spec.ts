import * as faker from 'faker';
import { Code, failMessage } from '../../../../_common/domain/ReturnMessage';
import { validate } from '../../../../_common/infrastructure/adapters/validate.adapter';
import { HasPetRelation } from '../HasPet.relation';
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

    it('persists relation when data is valid and user has < 2 pets', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [],
      );

      await useCases.createRelation(sampleRelation, mockedId);

      expect(IHasPetRelationRepositoryMock.persist).toHaveBeenCalled();
    });

    it('returns failMessage if user allready has 2 pets', async () => {
      IHasPetRelationRepositoryMock.getAllHasPetRelations.mockResolvedValueOnce(
        [
          new HasPetRelation(mockedId, faker.datatype.uuid()),
          new HasPetRelation(mockedId, faker.datatype.uuid()),
        ],
      );

      const response = await useCases.createRelation(sampleRelation, mockedId);

      expect(response).toStrictEqual(failMessage(Code.NOT_ALLOWED));
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
