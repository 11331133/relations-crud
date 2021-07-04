import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  CreatePetProfileDTO,
  DeletePetProfileDTO,
  EditPetProfileDTO,
  GetPetProfileDTO,
} from '../../../domain/PetProfile/IPetProfile.dto';
import { PetProfileUseCases } from '../../../domain/PetProfile/PetProfile.usecases';
import { Role, Roles } from '../common/Roles.decorator';
import { HumanId } from '../common/UserParam.decorator';

@Controller('petProfile')
export class PetProfileController {
  constructor(private _useCases: PetProfileUseCases) {}

  @Post('create')
  @Roles({ roles: [Role.Human] })
  public async createProfile(
    @Body() dto: CreatePetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createProfile(dto, humanId);
  }

  @Put('edit')
  @Roles({ roles: [Role.Human] })
  public async editProfile(
    @Body() dto: EditPetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  public async getProfile(@Body() dto: GetPetProfileDTO) {
    return await this._useCases.getProfile(dto);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  public async deleteProfile(
    @Body() dto: DeletePetProfileDTO,
    humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
