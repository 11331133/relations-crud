import { ISchema } from 'src/domain/common/ISchema';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);

export function validate(dto: unknown, schema: ISchema): void {
  const ajvValidator = ajv.getSchema(schema.$id) || ajv.compile(schema);

  const valid = ajvValidator(dto);

  if (!valid) {
    const message = ajvValidator.errors.reduce(
      (total: string, current: ErrorObject) => {
        return (
          total + '\n' + current.instancePath.slice(1) + ' ' + current.message
        );
      },
      'Validation error:',
    );
    throw new Error(message);
  }
}
