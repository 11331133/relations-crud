import { SetMetadata } from '@nestjs/common';

export enum Role {
  Human = 'Human',
  Pet = 'Pet',
}

export const Roles = ({
  roles,
  optional,
}: {
  roles?: Role[];
  optional?: boolean;
}) =>
  SetMetadata('roles', {
    roles,
    optional,
  });
