import { ISchema } from '../common/ISchema';

export const CreateHasPetRelationSchema: ISchema = {
  $id: 'CreateHasPetRelationSchema',
  type: 'object',
  properties: {
    petId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['petId'],
  additionalProperties: false,
};

export const DeleteHasPetRelationSchema: ISchema = {
  $id: 'DeleteHasPetRelationSchema',
  type: 'object',
  properties: {
    petId: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['petId'],
  additionalProperties: false,
};
