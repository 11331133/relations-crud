import { ExecutionContext } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const authRules = this._reflector.get<{
      roles: string[];
      optional: boolean;
    }>('roles', context.getHandler());
    if (!authRules) return true;

    const request = context.switchToHttp().getRequest();
    const { userRole } = request;

    if (!authRules.roles.includes(userRole) && !authRules.optional) {
      return false;
    }

    return true;
  }
}
