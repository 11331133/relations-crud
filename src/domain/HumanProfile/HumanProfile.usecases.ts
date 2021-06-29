import { IGenerateId } from '../common/IGenerateId';
import { IValidate } from '../common/IValidate';
import { IHasFriendRelRepository } from '../HasFriend/IHasFriendRel.repository';
import { HumanProfile } from './HumanProfile.entity';
import {
  CreateProfileSchema,
  DeleteProfileSchema,
  EditProfileSchema,
  GetProfileSchema,
} from './HumanProfile.schema';
import {
  CreateProfileDTO,
  DeleteProfileDTO,
  EditProfileDTO,
  GetProfileDTO,
} from './IHumanProfile.dto';
import { IHumanProfileRepository } from './IHumanProfile.repository';

export class HumanProfileUseCases {
  constructor(
    private _profileRepository: IHumanProfileRepository,
    private _hasFriendRelationRepository: IHasFriendRelRepository,
    private _validate: IValidate,
    private _generateId: IGenerateId,
  ) {}

  public async createProfile(dto: CreateProfileDTO) {
    this._validate(dto, CreateProfileSchema);

    const profile = new HumanProfile(
      dto.name,
      dto.middlename,
      dto.surname,
      new Date(dto.birthday),
      await this._generateId(),
    );

    return await this._profileRepository.persist(profile);
  }

  public async editProfile(dto: EditProfileDTO, user: HumanProfile) {
    this._validate(dto, EditProfileSchema);

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

  public async getProfile(dto: GetProfileDTO, user: HumanProfile) {
    this._validate(dto, GetProfileSchema);

    const profile = await this._profileRepository.findOne(dto.id);
    if (!profile) return false;

    const isFriend = await this._hasFriendRelationRepository.isFriend(
      profile.id,
      user.id,
    );

    return {
      name: profile.name,
      middlename: profile.middlename,
      surname: profile.surname,
      birthday: isFriend ? profile.birthday : null,
    };
  }

  public async deleteProfile(dto: DeleteProfileDTO, user: HumanProfile) {
    this._validate(dto, DeleteProfileSchema);

    if (!this.isSamePerson(dto.id, user.id)) return false;

    await this._profileRepository.deleteOne(dto.id);
  }

  private isSamePerson(firstId: string, secondId: string) {
    return firstId === secondId;
  }
}
