import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanProfileUseCases } from '../domain/HumanProfile.usecases';
import { CreateHumanProfileDTO, EditHumanProfileDTO, GetHumanProfileDTO, DeleteHumanProfileDTO } from '../domain/IHumanProfile.dto';

@Controller('humanProfile')
export class HumanProfileController {
  constructor(private _useCases: HumanProfileUseCases) {}

  @Post('create')
  public async createProfile(@Body() dto: CreateHumanProfileDTO) {
    return await this._useCases.createProfile(dto);
  }

  @Put('edit')
  @Roles({ roles: [Role.Human] })
  public async editProfile(
    @Body() dto: EditHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  @Roles({ roles: [Role.Human], optional: true })
  public async getProfile(
    @Param() dto: GetHumanProfileDTO,
    @HumanId(false) humanId: string,
  ) {
    return await this._useCases.getProfile(dto, humanId);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  public async deleteProfile(
    @Param() dto: DeleteHumanProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
