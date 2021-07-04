import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../webserver/common/Roles.decorator';

@Injectable()
export class AuthentificationService {
  constructor(private _configService: ConfigService) {}

  public async login(userId: string, role: Role) {
    // complex authentification logic

    return {
      token: jwt.sign(
        {
          id: userId,
          role,
        },
        this._configService.get('JWT_SECRET_KEY'),
        {
          algorithm: this._configService.get('JWT_SIGN_ALGORITHM'),
          expiresIn: '1h',
        },
      ),
    };
  }
}
