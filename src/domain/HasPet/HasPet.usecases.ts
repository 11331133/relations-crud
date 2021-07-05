import { IValidate } from '../common/IValidate';
import { successMessage } from '../common/ReturnMessage';
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

  public async getAllHasPetRelations(humanId: string) {
    // this method is empty, but open for new business logic
    // for example: Only friends and owner can see list of pets
    const relations = await this._relationRepository.getAllHasPetRelations(
      humanId,
    );

    return successMessage({
      petIds: relations.map((relation) => relation.petId),
    });
  }
}
