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
import { IHasPetRepository } from './IHasPet.repository';

export class HasPetRelationUseCases {
  constructor(
    private _relationRepository: IHasPetRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(dto: CreateHasPetRelationDTO, humanId: string) {
    this._validate(dto, CreateHasPetRelationSchema);

    const relation = new HasPetRelation(humanId, dto.petId);

    await this._relationRepository.persist(relation);
  }

  public async deleteRelation(dto: DeleteHasPetRelationDTO, humanId: string) {
    this._validate(dto, DeleteHasPetRelationSchema);

    await this._relationRepository.deleteOne(humanId, dto.petId);
  }
}
