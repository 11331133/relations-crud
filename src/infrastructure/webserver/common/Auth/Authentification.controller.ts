import { Body, Controller, Post } from '@nestjs/common';
import { AuthentificationService } from '../../../auth/Authentification.service';
import { Role } from '../Roles.decorator';

@Controller('auth')
export class AuthentificationController {
  constructor(private _authService: AuthentificationService) {}

  @Post('login')
  public async login(@Body('id') userId: string, @Body('role') role: Role) {
    return this._authService.login(userId, role);
  }
}
