import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { LoginDTO } from './Authentification.dto';
import { LoginSchema } from './Authentification.schema';
import { AuthentificationService } from './Authentification.service';

@Controller('auth')
@ApiTags('Authentification')
export class AuthentificationController {
  constructor(private _authService: AuthentificationService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Generate JWT token',
    description:
      'Generate JWT token for authentification. ' +
      'Note that prior registration is optional for simple testing. You can type any nickname',
  })
  @ApiBody({ schema: LoginSchema as SchemaObject })
  @ApiOkResponse({ description: 'Successfully generated token' })
  @ApiForbiddenResponse({ description: 'Validation error' })
  public async login(@Body() dto: LoginDTO) {
    return this._authService.login(dto.id, dto.role);
  }
}
