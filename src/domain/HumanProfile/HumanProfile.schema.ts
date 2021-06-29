import { ISchema } from '../common/ISchema';

export const CreateProfileSchema: ISchema = {
  $id: 'CreateProfileSchema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    middlename: {
      type: 'string',
      minLength: 1,
    },
    surname: {
      type: 'string',
      minLength: 1,
    },
    birthday: {
      type: 'string',
      format: 'date-time',
      minLength: 5,
    },
  },
  required: ['name', 'middlename', 'surname', 'birthday'],
};

export const EditProfileSchema: ISchema = {
  $id: 'EditProfileSchema',
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
    middlename: {
      type: 'string',
      minLength: 1,
    },
    surname: {
      type: 'string',
      minLength: 1,
    },
    birthday: {
      type: 'string',
      format: 'date-time',
      minLength: 5,
    },
  },
  anyOf: [
    { required: ['name'] },
    { required: ['middlename'] },
    { required: ['surname'] },
    { required: ['birthday'] },
  ],
};

export const GetProfileSchema: ISchema = {
  $id: 'GetProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
};

export const DeleteProfileSchema: ISchema = {
  $id: 'DeleteProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
};
