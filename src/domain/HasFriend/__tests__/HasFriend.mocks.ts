import { IHasFriendRelRepository } from '../IHasFriendRel.repository';

export const IHasFriendRelRepositoryMock = {
  persist: jest.fn(),
  merge: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
  getAllFriends: jest.fn(),
  isFriend: jest.fn(),
};
