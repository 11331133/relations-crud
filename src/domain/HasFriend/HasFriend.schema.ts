import { ISchema } from '../common/ISchema';

export const CreateHasFriendRelationSchema: ISchema = {
  $id: 'CreateHasFriendRelationSchema',
  type: 'object',
  properties: {
    friendId: 'string',
    minLength: 5,
  },
  required: ['friendId'],
};

export const DeleteHasFriendRelationSchema: ISchema = {
  $id: 'DeleteHasFriendRelationSchema',
  type: 'object',
  properties: {
    friendId: 'string',
    minLength: 5,
  },
  required: ['friendId'],
};
