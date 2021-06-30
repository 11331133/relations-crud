import { IValidate } from '../common/IValidate';
import { PetProfile } from '../PetProfile/PetProfile.entity';
import {
  CreateLoveHumanRelationDTO,
  DeleteLoveHumanRelationDTO,
  EditLoveHumanRelationDTO,
} from './ILoveHumanRel.dto';
import { ILoveHumanRepository } from './ILoveHumanRel.repository';
import { LoveHumanRelation } from './LoveHuman.relation';
import {
  CreateLoveHumanRelationSchema,
  DeleteLoveHumanRelationSchema,
  EditLoveHumanRelationSchema,
} from './LoveHumanRel.shema';

export class LoveHumanRelationUseCases {
  constructor(
    private _relationRepository: ILoveHumanRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(
    dto: CreateLoveHumanRelationDTO,
    user: PetProfile,
  ) {
    this._validate(dto, CreateLoveHumanRelationSchema);

    const relation = new LoveHumanRelation(dto.humanId, user.id, dto.strength);

    return await this._relationRepository.persist(relation);
  }

  public async editRelation(dto: EditLoveHumanRelationDTO, user: PetProfile) {
    this._validate(dto, EditLoveHumanRelationSchema);

    const relation = new LoveHumanRelation(dto.humanId, user.id, dto.strength);

    await this._relationRepository.merge(relation);
  }

  public async deleteRelation(
    dto: DeleteLoveHumanRelationDTO,
    user: PetProfile,
  ) {
    this._validate(dto, DeleteLoveHumanRelationSchema);

    return await this._relationRepository.deleteOne(user.id, dto.humanId);
  }
}
