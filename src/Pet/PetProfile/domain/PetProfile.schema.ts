import { ISchema } from '../../../_common/domain/ISchema';

export const CreatePetProfileSchema: ISchema = {
  $id: 'CreatePetProfileSchema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    birthday: {
      type: 'string',
      format: 'date-time',
      minLength: 1,
    },
  },
  required: ['name', 'birthday'],
};

export const EditPetProfileSchema: ISchema = {
  $id: 'EditPetProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    birthday: {
      type: 'string',
      format: 'date-time',
      minLength: 1,
    },
  },
  required: ['id'],
  anyOf: [{ required: ['name'] }, { required: ['birthday'] }],
};

export const GetPetProfileSchema: ISchema = {
  $id: 'GetPetProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
};

export const DeletePetProfileSchema: ISchema = {
  $id: 'DeletePetProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
};
