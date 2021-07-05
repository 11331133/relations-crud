import { IValidate } from '../common/IValidate';
import {
  CreateLovesHumanRelationDTO,
  DeleteLovesHumanRelationDTO,
  EditLovesHumanRelationDTO,
} from './ILovesHuman.dto';
import { ILovesHumanRepository } from './ILovesHuman.repository';
import { LovesHumanRelation } from './LovesHuman.relation';
import {
  CreateLovesHumanRelationSchema,
  DeleteLovesHumanRelationSchema,
  EditLovesHumanRelationSchema,
} from './LovesHuman.schema';

export class LovesHumanRelationUseCases {
  constructor(
    private _relationRepository: ILovesHumanRepository,
    private _validate: IValidate,
  ) {}

  public async createRelation(dto: CreateLovesHumanRelationDTO, petId: string) {
    this._validate(dto, CreateLovesHumanRelationSchema);

    const relation = new LovesHumanRelation(dto.humanId, petId, dto.strength);

    return await this._relationRepository.persist(relation);
  }

  public async editRelation(dto: EditLovesHumanRelationDTO, petId: string) {
    this._validate(dto, EditLovesHumanRelationSchema);

    const relation = new LovesHumanRelation(dto.humanId, petId, dto.strength);

    await this._relationRepository.merge(relation);
  }

  public async deleteRelation(dto: DeleteLovesHumanRelationDTO, petId: string) {
    this._validate(dto, DeleteLovesHumanRelationSchema);

    return await this._relationRepository.deleteOne(petId, dto.humanId);
  }
}
