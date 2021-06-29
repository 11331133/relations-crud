import { IGenerateId } from '../common/IGenerateId';
import { IValidate } from '../common/IValidate';
import { IHasFriendRelRepository } from '../HasFriend/IHasFriendRel.repository';
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

    return await this._profileRepository.persist(profile);
  }

  public async editProfile(dto: EditHumanProfileDTO, user: HumanProfile) {
    this._validate(dto, EditHumanProfileSchema);

    const profile = await this._profileRepository.findOne(dto.id);
    if (!profile || !this.isSamePerson(dto.id, user.id)) return false;

    const editedProfile = new HumanProfile(
      dto.name || profile.name,
      dto.middlename || profile.middlename,
      dto.surname || profile.surname,
      dto.birthday ? new Date(dto.birthday) : profile.birthday,
      dto.id,
    );

    return await this._profileRepository.merge(editedProfile);
  }

  public async getProfile(dto: GetHumanProfileDTO, user?: HumanProfile) {
    this._validate(dto, GetHumanProfileSchema);

    const profile = await this._profileRepository.findOne(dto.id);
    if (!profile) return false;
    const isFriend = user
      ? await this._hasFriendRelationRepository.isFriend(profile.id, user.id)
      : false;

    return {
      name: profile.name,
      middlename: profile.middlename,
      surname: profile.surname,
      birthday: isFriend ? profile.birthday : null,
    };
  }

  public async deleteProfile(dto: DeleteHumanProfileDTO, user?: HumanProfile) {
    this._validate(dto, DeleteHumanProfileSchema);

    if (!user || !this.isSamePerson(dto.id, user.id)) return false;

    await this._profileRepository.deleteOne(dto.id);
  }

  private isSamePerson(firstId: string, secondId: string) {
    return firstId === secondId;
  }
}
