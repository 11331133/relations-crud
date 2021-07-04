import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'neo4j-driver-core';
import { EntityManager, Repository } from 'typeorm';
import { IPetProfileRepository } from '../../../domain/PetProfile/IPetProfile.repository';
import { PetProfile } from '../../../domain/PetProfile/PetProfile.entity';
import { TransactionRunner } from '../common/TransactionRunner';
import { PetProfileGraphPersistence } from './PetProfile.graph-persistence';
import { PetProfileMapper } from './PetProfile.mapper';
import { PetProfileOrmEntity } from './PetProfile.orm-entity';

export class PetProfilePersistenceService implements IPetProfileRepository {
  constructor(
    @InjectRepository(PetProfileOrmEntity)
    private _relationalDBRepository: Repository<PetProfileOrmEntity>,
    private _graphDBRepository: PetProfileGraphPersistence,
    private _transactionRunner: TransactionRunner,
  ) {}

  public async persist(profile: PetProfile): Promise<boolean> {
    try {
      await Promise.all([
        this._relationalDBRepository.save(
          PetProfileMapper.mapToOrmEntity(profile),
        ),
        this._graphDBRepository.persist(profile),
      ]);
    } catch (error) {
      console.log('Error occured', error);
      await Promise.all([
        this._relationalDBRepository.delete(profile.id),
        this._graphDBRepository.deleteOne(profile.id),
      ]);
    }
    return true;
  }

  public async merge(profile: PetProfile): Promise<boolean> {
    const entity = PetProfileMapper.mapToOrmEntity(profile);

    await this._relationalDBRepository.save(entity);
    return true;
  }

  public async findOne(id: string): Promise<PetProfile> {
    const entity = await this._relationalDBRepository.findOne(id);
    if (!entity) return undefined;

    return PetProfileMapper.mapToDomainEntity(entity);
  }

  public async deleteOne(id: string): Promise<boolean> {
    const relationalDBcallback = async (manager: EntityManager) => {
      await manager.delete(PetProfileOrmEntity, { id });
    };

    const graphDBcallback = async (queryRunner: Transaction) => {
      await this._graphDBRepository.deleteOneInTransaction(queryRunner, id);
    };

    await this._transactionRunner.run(relationalDBcallback, graphDBcallback);
    return true;
  }
}
