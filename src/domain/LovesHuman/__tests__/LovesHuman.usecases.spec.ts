import * as faker from 'faker';
import { validate } from '../../../infrastructure/adapters/validate.adapter';
import { LovesHumanRelationUseCases } from '../LovesHuman.usecases';
import { ILovesHumanRepositoryMock } from './LovesHuman.mocks';

describe('LovesHuman use cases', () => {
  const useCases = new LovesHumanRelationUseCases(
    ILovesHumanRepositoryMock,
    validate,
  );

  const sampleRelation = {
    humanId: faker.datatype.uuid(),
    strength: faker.datatype.number({ min: -5, max: 5 }),
  };

  const mockedId = faker.datatype.uuid();

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
          await useCases.createRelation(unvalidDTO, mockedId);
        }).rejects.toThrow();
      });
    });

    it('persists relation if data is valid', async () => {
      await useCases.createRelation(sampleRelation, mockedId);

      expect(ILovesHumanRepositoryMock.persist).toHaveBeenCalled();
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
          await useCases.editRelation(unvalidDTO, mockedId);
        }).rejects.toThrow();
      });
    });

    it('merges relation when data is valid', async () => {
      await useCases.editRelation(sampleRelation, mockedId);

      expect(ILovesHumanRepositoryMock.merge).toHaveBeenCalled();
    });
  });

  describe('deleteRelation method()', () => {
    it('throw error when humanId is too short', async () => {
      await expect(async () => {
        await useCases.deleteRelation(
          { ...sampleRelation, humanId: '' },
          mockedId,
        );
      }).rejects.toThrow();

      await expect(async () => {
        await useCases.deleteRelation(
          { ...sampleRelation, humanId: faker.datatype.uuid().slice(0, 4) },
          mockedId,
        );
      }).rejects.toThrow();
    });

    it('deletes relation when data is valid', async () => {
      await useCases.deleteRelation(
        { humanId: sampleRelation.humanId },
        mockedId,
      );

      expect(ILovesHumanRepositoryMock.deleteOne).toHaveBeenCalled();
    });
  });
});
