import { IGenerateId } from '../../../_common/domain/IGenerateId';
import { IValidate } from '../../../_common/domain/IValidate';
import {
  successMessage,
  failMessage,
  Code,
} from '../../../_common/domain/ReturnMessage';
import { IHasFriendRelRepository } from '../../HasFriend/domain/IHasFriend.repository';
import { HumanProfile } from './HumanProfile.entity';
import {
  CreateHumanProfileSchema,
  DeleteHumanProfileSchema,
  EditHumanProfileSchema,
  GetHumanProfileSchema,
} from './HumanProfile.schema';
import {
  CreateHumanProfileDTO,
  DeleteHumanProfileDTO,
  EditHumanProfileDTO,
  GetHumanProfileDTO,
} from './IHumanProfile.dto';
import { IHumanProfileRepository } from './IHumanProfile.repository';

export class HumanProfileUseCases {
  constructor(
    private _profileRepository: IHumanProfileRepository,
    private _hasFriendRelationRepository: IHasFriendRelRepository,
    private _validate: IValidate,
    private _generateId: IGenerateId,
  ) {}

  public async createProfile(dto: CreateHumanProfileDTO) {
    this._validate(dto, CreateHumanProfileSchema);

    const profile = new HumanProfile(
      dto.name,
      dto.middlename,
      dto.surname,
      new Date(dto.birthday),
      await this._generateId(),
    );

    await this._profileRepository.persist(profile);
    return successMessage({ id: profile.id });
  }

  public async editProfile(dto: EditHumanProfileDTO, humanId: string) {
    this._validate(dto, EditHumanProfileSchema);

    const profile = await this._profileRepository.findOne(dto.id);
    if (!profile || !this.isSamePerson(dto.id, humanId))
      return failMessage(Code.FORBIDDEN);

    const editedProfile = new HumanProfile(
      dto.name || profile.name,
      dto.middlename || profile.middlename,
      dto.surname || profile.surname,
      dto.birthday ? new Date(dto.birthday) : profile.birthday,
      dto.id,
    );

    await this._profileRepository.merge(editedProfile);
  }

  public async getProfile(dto: GetHumanProfileDTO, humanId?: string) {
    this._validate(dto, GetHumanProfileSchema);

    const profile = await this._profileRepository.findOne(dto.id);
    if (!profile) return failMessage(Code.NOT_FOUND);
    const isFriend = humanId
      ? await this._hasFriendRelationRepository.isFriend(profile.id, humanId)
      : false;

    return successMessage({
      name: profile.name,
      middlename: profile.middlename,
      surname: profile.surname,
      birthday: isFriend ? profile.birthday : null,
    });
  }

  public async deleteProfile(dto: DeleteHumanProfileDTO, humanId: string) {
    this._validate(dto, DeleteHumanProfileSchema);

    if (!this.isSamePerson(dto.id, humanId)) return failMessage(Code.FORBIDDEN);

    await this._profileRepository.deleteOne(dto.id);
  }

  private isSamePerson(firstId: string, secondId: string) {
    return firstId === secondId;
  }
}
