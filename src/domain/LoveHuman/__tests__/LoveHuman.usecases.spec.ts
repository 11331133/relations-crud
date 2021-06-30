import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { PetProfileEntityMock } from '../../PetProfile/__tests__/PetProfile.mocks';
import { LoveHumanRelationUseCases } from '../LoveHumanRel.usecases';
import { ILoveHumanRepositoryMock } from './LoveHuman.mocks';

describe('LoveHuman use cases', () => {
  const useCases = new LoveHumanRelationUseCases(
    ILoveHumanRepositoryMock,
    validate,
  );

  const sampleRelation = {
    humanId: faker.datatype.uuid(),
    strength: faker.datatype.number({ min: -5, max: 5 }),
  };

  describe('createRelation method()', () => {
    describe('throw error when', () => {
      test.each([
        ['HumanId is empty', { ...sampleRelation, humanId: '' }],
        [
          'HumanId is too short',
          { ...sampleRelation, humanId: faker.datatype.uuid().slice(0, 4) },
        ],
        [
          'Strength is more than 5',
          { ...sampleRelation, strength: faker.datatype.number({ min: 6 }) },
        ],
        [
          'Strength is lower than -5',
          {
            ...sampleRelation,
            strength: faker.datatype.number({ min: -100000, max: -6 }),
          },
        ],
      ])('%s', async (description, unvalidDTO) => {
        await expect(async () => {
          await useCases.createRelation(unvalidDTO, PetProfileEntityMock);
        }).rejects.toThrow();
      });
    });

    it('persists relation if data is valid', async () => {
      await useCases.createRelation(sampleRelation, PetProfileEntityMock);

      expect(ILoveHumanRepositoryMock.persist).toHaveBeenCalled();
    });
  });

  describe('editRelation method()', () => {
    describe('throw error when', () => {
      test.each([
        ['HumanId is empty', { ...sampleRelation, humanId: '' }],
        [
          'HumanId is too short',
          { ...sampleRelation, humanId: faker.datatype.uuid().slice(0, 4) },
        ],
        [
          'Strength is more than 5',
          { ...sampleRelation, strength: faker.datatype.number({ min: 6 }) },
        ],
        [
          'Strength is lower than -5',
          {
            ...sampleRelation,
            strength: faker.datatype.number({ min: -100000, max: -6 }),
          },
        ],
      ])('%s', async (description, unvalidDTO) => {
        await expect(async () => {
          await useCases.editRelation(unvalidDTO, PetProfileEntityMock);
        }).rejects.toThrow();
      });
    });

    it('merges relation when data is valid', async () => {
      await useCases.editRelation(sampleRelation, PetProfileEntityMock);

      expect(ILoveHumanRepositoryMock.merge).toHaveBeenCalled();
    });
  });

  describe('deleteRelation method()', () => {
    it('throw error when humanId is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation(
          { ...sampleRelation, humanId: '' },
          PetProfileEntityMock,
        );
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation(
          { ...sampleRelation, humanId: faker.datatype.uuid().slice(0, 4) },
          PetProfileEntityMock,
        );
      }).rejects.toThrow();
    });

    it('deletes relation when data is valid', async () => {
      await useCases.deleteRelation(
        { humanId: sampleRelation.humanId },
        PetProfileEntityMock,
      );

      expect(ILoveHumanRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});
