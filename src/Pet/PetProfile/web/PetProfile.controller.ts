import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../../Auth/common/Roles.decorator';
import { HumanId } from '../../../Auth/common/UserParam.decorator';
import {
  CreatePetProfileDTO,
  EditPetProfileDTO,
  GetPetProfileDTO,
  DeletePetProfileDTO,
} from '../domain/IPetProfile.dto';
import { PetProfileUseCases } from '../domain/PetProfile.usecases';
import { PetProfileApiDocs } from './PetProfile.api-docs';

@Controller('petProfile')
@ApiTags('Pet profile')
export class PetProfileController {
  constructor(private _useCases: PetProfileUseCases) {}

  @Post()
  @Roles({ roles: [Role.Human] })
  @PetProfileApiDocs.createProfile
  public async createProfile(
    @Body() dto: CreatePetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.createProfile(dto, humanId);
  }

  @Put()
  @Roles({ roles: [Role.Human] })
  @PetProfileApiDocs.editProfile
  public async editProfile(
    @Body() dto: EditPetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.editProfile(dto, humanId);
  }

  @Get(':id')
  @PetProfileApiDocs.getProfile
  public async getProfile(@Param() dto: GetPetProfileDTO) {
    return await this._useCases.getProfile(dto);
  }

  @Delete(':id')
  @Roles({ roles: [Role.Human] })
  @PetProfileApiDocs.deleteProfile
  public async deleteProfile(
    @Param() dto: DeletePetProfileDTO,
    @HumanId() humanId: string,
  ) {
    return await this._useCases.deleteProfile(dto, humanId);
  }
}
