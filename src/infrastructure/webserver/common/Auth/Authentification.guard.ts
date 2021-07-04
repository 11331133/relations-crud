import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private _configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;

    if (token) {
      if (token.startsWith('Bearer')) {
        token = token.slice(7);
      }

      const payload = jwt.verify(
        token,
        this._configService.get('JWT_SECRET_KEY'),
        {
          algorithms: this._configService
            .get('JWT_VERIFY_ALGORITHMS')
            .split(','),
        },
      ) as jwt.JwtPayload;

      request.userRole = payload.role;
      request.userId = payload.id;
    }

    return true;
  }
}
