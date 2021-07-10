import { ISchema } from '../_common/domain/ISchema';
import { Role } from './common/Roles.decorator';

export const LoginSchema: ISchema = {
  $id: 'LoginSchema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    role: {
      type: 'string',
      enum: [Role.Human, Role.Pet],
    },
  },
  additionalProperties: false,
};
