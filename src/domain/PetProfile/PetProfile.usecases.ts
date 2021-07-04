import { IGenerateId } from '../common/IGenerateId';
import { IValidate } from '../common/IValidate';
import { IPetProfileRepository } from './IPetProfile.repository';
import {
  CreatePetProfileDTO,
  EditPetProfileDTO,
  GetPetProfileDTO,
  DeletePetProfileDTO,
} from './IPetProfile.dto';
import {
  CreatePetProfileSchema,
  EditPetProfileSchema,
  GetPetProfileSchema,
  DeletePetProfileSchema,
} from './PetProfile.schema';
import { PetProfile } from './PetProfile.entity';
import { HumanProfile } from '../HumanProfile/HumanProfile.entity';
import { IHasPetRepository } from '../HasPet/IHasPet.repository';
import { HasPetRelation } from '../HasPet/HasPet.relation';

export class PetProfileUseCases {
  constructor(
    private _profileRepository: IPetProfileRepository,
    private _hasPetRelationRepository: IHasPetRepository,
    private _validate: IValidate,
    private _generateId: IGenerateId,
  ) {}

  public async createProfile(dto: CreatePetProfileDTO, humanId: string) {
    this._validate(dto, CreatePetProfileSchema);

    const existingPets = await this._hasPetRelationRepository.getAllHasPetRelations(
      humanId,
    );
    if (existingPets.length >= 2) return false;

    const petId = await this._generateId();
    const profile = new PetProfile(dto.name, new Date(dto.birthday), petId);
    const relation = new HasPetRelation(humanId, petId);

    await Promise.all([
      this._hasPetRelationRepository.persist(relation),
      this._profileRepository.persist(profile),
    ]);

    return true;
  }

  public async editProfile(dto: EditPetProfileDTO, humanId: string) {
    this._validate(dto, EditPetProfileSchema);

    const petProfile = await this._profileRepository.findOne(dto.id);
    if (!petProfile) return false;

    if (!(await this.isPetOwnedByUser(humanId, petProfile.id))) return false;

    const editedProfile = new PetProfile(
      dto.name ? dto.name : petProfile.name,
      dto.birthday ? new Date(dto.birthday) : petProfile.birthday,
      petProfile.id,
    );

    return await this._profileRepository.merge(editedProfile);
  }

  public async getProfile(dto: GetPetProfileDTO) {
    this._validate(dto, GetPetProfileSchema);

    const petProfile = await this._profileRepository.findOne(dto.id);

    return {
      name: petProfile.name,
      birthday: petProfile.birthday,
    };
  }

  public async deleteProfile(dto: DeletePetProfileDTO, humanId: string) {
    this._validate(dto, DeletePetProfileSchema);

    if (!(await this.isPetOwnedByUser(humanId, dto.id))) return false;

    return await this._profileRepository.deleteOne(dto.id);
  }

  private async isPetOwnedByUser(userId: string, petId: string) {
    const userPetsIds = (
      await this._hasPetRelationRepository.getAllHasPetRelations(userId)
    ).map((relation) => relation.petId);

    return userPetsIds.some((id) => id === petId);
  }
}
