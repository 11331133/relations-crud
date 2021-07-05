import { ISchema } from '../common/ISchema';

export const CreateLovesHumanRelationSchema: ISchema = {
  $id: 'CreateLovesHumanRelationSchema',
  type: 'object',
  properties: {
    humanId: {
      type: 'string',
      minLength: 5,
    },
    strength: {
      type: 'number',
      minimum: -5,
      maximum: 5,
    },
  },
  required: ['humanId', 'strength'],
  additionalProperties: false,
};

export const DeleteLovesHumanRelationSchema: ISchema = {
  $id: 'DeleteLovesHumanRelationSchema',
  type: 'object',
  properties: {
    humanId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['humanId'],
  additionalProperties: false,
};

export const EditLovesHumanRelationSchema: ISchema = {
  $id: 'EditLovesHumanRelationSchema',
  type: 'object',
  properties: {
    humanId: {
      type: 'string',
      minLength: 5,
    },
    strength: {
      type: 'number',
      minimum: -5,
      maximum: 5,
    },
  },
  required: ['humanId', 'strength'],
  additionalProperties: false,
};
