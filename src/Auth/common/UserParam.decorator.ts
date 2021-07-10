import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from './Roles.decorator';

const createUserParamDecorator = (role: Role) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userRole = request.userRole;

    if (role === userRole) return request.userId;
    else return undefined;
  });

export const HumanId = createUserParamDecorator(Role.Human);
export const PetId = createUserParamDecorator(Role.Pet);
