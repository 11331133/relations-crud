import { ISchema } from '../../../_common/domain/ISchema';

export const CreateHasFriendRelationSchema: ISchema = {
  $id: 'CreateHasFriendRelationSchema',
  type: 'object',
  properties: {
    friendId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['friendId'],
  additionalProperties: false,
};

export const DeleteHasFriendRelationSchema: ISchema = {
  $id: 'DeleteHasFriendRelationSchema',
  type: 'object',
  properties: {
    friendId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['friendId'],
  additionalProperties: false,
};

export const GetAllFriendsSchema: ISchema = {
  $id: 'GetAllFriendsSchema',
  type: 'object',
  properties: {
    friendId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['friendId'],
  additionalProperties: false,
};
