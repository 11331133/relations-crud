import { IValidate } from '../common/IValidate';
import { HumanProfile } from '../HumanProfile/HumanProfile.entity';
import { HasPetRelation } from './HasPet.relation';
import {
  CreateHasPetRelationSchema,
  DeleteHasPetRelationSchema,
} from './HasPet.schema';
import {
  CreateHasPetRelationDTO,
  DeleteHasPetRelationDTO,
} from './IHasPet.dto';
import { IHasPetRepository } from './IHasPetRel.repository';

export class HasPetRelationUseCases {
  constructor(
    private _relationRepository: IHasPetRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(
    dto: CreateHasPetRelationDTO,
    user: HumanProfile,
  ) {
    this._validate(dto, CreateHasPetRelationSchema);

    const relation = new HasPetRelation(user.id, dto.petId);

    await this._relationRepository.persist(relation);
  }

  public async deleteRelation(
    dto: DeleteHasPetRelationDTO,
    user: HumanProfile,
  ) {
    this._validate(dto, DeleteHasPetRelationSchema);

    await this._relationRepository.deleteOne(user.id, dto.petId);
  }
}
