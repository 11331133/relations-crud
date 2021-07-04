import { ISchema } from '../common/ISchema';

export const CreateLoveHumanRelationSchema: ISchema = {
  $id: 'CreateLoveHumanRelationSchema',
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

export const DeleteLoveHumanRelationSchema: ISchema = {
  $id: 'DeleteLoveHumanRelationSchema',
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

export const EditLoveHumanRelationSchema: ISchema = {
  $id: 'EditLoveHumanRelationSchema',
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
