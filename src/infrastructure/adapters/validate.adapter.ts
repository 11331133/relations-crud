import { ISchema } from 'src/domain/common/ISchema';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { HttpException, HttpStatus } from '@nestjs/common';
const ajv = new Ajv();
addFormats(ajv);

class ValidationError extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export function validate(dto: unknown, schema: ISchema): void {
  const ajvValidator = ajv.getSchema(schema.$id) || ajv.compile(schema);

  const valid = ajvValidator(dto);

  if (!valid) {
    const message = ajvValidator.errors.reduce(
      (total: string, current: ErrorObject) => {
        return (
          total + ' ' + current.instancePath.slice(1) + ' ' + current.message
        );
      },
      'Validation error:',
    );
    throw new ValidationError(message);
  }
}
