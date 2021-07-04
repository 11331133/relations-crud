import { IValidate } from '../common/IValidate';
import {
  CreateLoveHumanRelationDTO,
  DeleteLoveHumanRelationDTO,
  EditLoveHumanRelationDTO,
} from './ILoveHuman.dto';
import { ILoveHumanRepository } from './ILoveHuman.repository';
import { LoveHumanRelation } from './LoveHuman.relation';
import {
  CreateLoveHumanRelationSchema,
  DeleteLoveHumanRelationSchema,
  EditLoveHumanRelationSchema,
} from './LoveHuman.schema';

export class LoveHumanRelationUseCases {
  constructor(
    private _relationRepository: ILoveHumanRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(dto: CreateLoveHumanRelationDTO, petId: string) {
    this._validate(dto, CreateLoveHumanRelationSchema);

    const relation = new LoveHumanRelation(dto.humanId, petId, dto.strength);

    return await this._relationRepository.persist(relation);
  }

  public async editRelation(dto: EditLoveHumanRelationDTO, petId: string) {
    this._validate(dto, EditLoveHumanRelationSchema);

    const relation = new LoveHumanRelation(dto.humanId, petId, dto.strength);

    await this._relationRepository.merge(relation);
  }

  public async deleteRelation(dto: DeleteLoveHumanRelationDTO, petId: string) {
    this._validate(dto, DeleteLoveHumanRelationSchema);

    return await this._relationRepository.deleteOne(petId, dto.humanId);
  }
}
