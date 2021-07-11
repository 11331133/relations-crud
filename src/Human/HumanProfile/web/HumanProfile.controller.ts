import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanProfileUseCases } from '../domain/HumanProfile.usecases';
import {
  CreateHumanProfileDTO,
  EditHumanProfileDTO,
  GetHumanProfileDTO,
  DeleteHumanProfileDTO,
} from '../domain/IHumanProfile.dto';
import { HumanProfileApiDocs } from './HumanProfile.api-docs';

@Controller('humanProfile')
@ApiTags('Human profile')
export class HumanProfileController {
  constructor(private _useCases: HumanProfileUseCases) {}

  @Post()
  @HumanProfileApiDocs.createProfile
  public async createProfile(@Body() dto: CreateHumanProfileDTO) {
    return await this._useCases.createProfile(dto);
  }

  @Put()
  @Roles({ roles: [Role.Human] })
  @HumanProfileApiDocs.editProfile
  public async editProfile(
    @Body() dto: EditHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  @Roles({ roles: [Role.Human], optional: true })
  @HumanProfileApiDocs.getProfile
  public async getProfile(
    @Param() dto: GetHumanProfileDTO,
    @HumanId(false) humanId: string,
  ) {
    return await this._useCases.getProfile(dto, humanId);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  @HumanProfileApiDocs.deleteProfile
  public async deleteProfile(
    @Param() dto: DeleteHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
