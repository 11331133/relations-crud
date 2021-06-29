import * as faker from 'faker';
import { HumanProfile } from '../HumanProfile.entity';

export const IHumanProfileRepositoryMock = {
  persist: jest.fn(),
  merge: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
};

export const HumanProfileEntityMock: HumanProfile = new HumanProfile(
  faker.name.firstName(),
  faker.name.lastName(),
  faker.name.middleName(),
  faker.date.past(),
  faker.datatype.uuid(),
);
