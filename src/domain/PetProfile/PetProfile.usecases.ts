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
import { IHasPetRepository } from '../HasPet/IHasPet.repository';
import { HasPetRelation } from '../HasPet/HasPet.relation';
import { Code, failMessage, successMessage } from '../common/ReturnMessage';

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
    if (existingPets.length >= 2) return failMessage(Code.NOT_ALLOWED);

    const petId = await this._generateId();
    const profile = new PetProfile(dto.name, new Date(dto.birthday), petId);
    const relation = new HasPetRelation(humanId, petId);

    try {
      await this._profileRepository.persist(profile);
      await this._hasPetRelationRepository.persist(relation);
    } catch (error) {
      await this._profileRepository.deleteOne(profile.id);
      await this._hasPetRelationRepository.deleteOne(humanId, petId);
    }

    return successMessage({ id: petId });
  }

  public async editProfile(dto: EditPetProfileDTO, humanId: string) {
    this._validate(dto, EditPetProfileSchema);

    const petProfile = await this._profileRepository.findOne(dto.id);
    if (!petProfile) return failMessage(Code.NOT_FOUND);

    if (!(await this.isPetOwnedByUser(humanId, petProfile.id)))
      return failMessage(Code.FORBIDDEN);

    const editedProfile = new PetProfile(
      dto.name ? dto.name : petProfile.name,
      dto.birthday ? new Date(dto.birthday) : petProfile.birthday,
      petProfile.id,
    );

    await this._profileRepository.merge(editedProfile);
  }

  public async getProfile(dto: GetPetProfileDTO) {
    this._validate(dto, GetPetProfileSchema);

    const petProfile = await this._profileRepository.findOne(dto.id);
    if (!petProfile) return failMessage(Code.NOT_FOUND);

    return successMessage({
      name: petProfile.name,
      age: petProfile.age,
    });
  }

  public async deleteProfile(dto: DeletePetProfileDTO, humanId: string) {
    this._validate(dto, DeletePetProfileSchema);

    if (!(await this.isPetOwnedByUser(humanId, dto.id)))
      return failMessage(Code.FORBIDDEN);

    await this._profileRepository.deleteOne(dto.id);
  }

  private async isPetOwnedByUser(userId: string, petId: string) {
    const userPetsIds = (
      await this._hasPetRelationRepository.getAllHasPetRelations(userId)
    ).map((relation) => relation.petId);

    return userPetsIds.some((id) => id === petId);
  }
}
