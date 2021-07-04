import jwt, { JwtPayload } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private _configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.header.authorization;

    if (token) {
      const payload = jwt.verify(
        token,
        this._configService.get('JWT_SECRET_KEY'),
        {
          algorithms: this._configService.get('JWT_ALGORITHMS').split(','),
        },
      ) as JwtPayload;

      request.userRole = payload.role;
      request.userId = payload.id;
    }

    return true;
  }
}
