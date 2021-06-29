import { ISchema } from '../common/ISchema';

export const CreateHumanProfileSchema: ISchema = {
  $id: 'CreateHumanProfileSchema',
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
  additionalProperties: false,
};

export const EditHumanProfileSchema: ISchema = {
  $id: 'EditHumanProfileSchema',
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
  required: ['id'],
  additionalProperties: false,
  anyOf: [
    { required: ['name'] },
    { required: ['middlename'] },
    { required: ['surname'] },
    { required: ['birthday'] },
  ],
};

export const GetHumanProfileSchema: ISchema = {
  $id: 'GetHumanProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
  additionalProperties: false,
};

export const DeleteHumanProfileSchema: ISchema = {
  $id: 'DeleteHumanProfileSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['id'],
  additionalProperties: false,
};
