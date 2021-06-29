import { ISchema } from './ISchema';

export interface IValidate {
  (dto: unknown, schema: ISchema): void;
}
