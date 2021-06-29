import * as faker from 'faker';
import { PetProfile } from '../PetProfile.entity';

export const IPetProfileRepositoryMock = {
  persist: jest.fn(),
  merge: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
};

export const PetProfileEntityMock = new PetProfile(
  faker.name.firstName(),
  faker.date.past(),
  faker.datatype.uuid(),
);
