import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'neo4j-driver-core';
import { EntityManager, Repository } from 'typeorm';
import { TransactionRunner } from '../../../_common/infrastructure/persistence/TransactionRunner';
import { IPetProfileRepository } from '../domain/IPetProfile.repository';
import { PetProfile } from '../domain/PetProfile.entity';
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

  public async persist(profile: PetProfile): Promise<void> {
    try {
      await Promise.all([
        this._relationalDBRepository.save(
          PetProfileMapper.mapToOrmEntity(profile),
        ),
        this._graphDBRepository.persist(profile),
      ]);
    } catch (error) {
      await Promise.all([
        this._relationalDBRepository.delete(profile.id),
        this._graphDBRepository.deleteOne(profile.id),
      ]);
    }
  }

  public async merge(profile: PetProfile): Promise<void> {
    const entity = PetProfileMapper.mapToOrmEntity(profile);

    await this._relationalDBRepository.save(entity);
  }

  public async findOne(id: string): Promise<PetProfile> {
    const entity = await this._relationalDBRepository.findOne(id);
    if (!entity) return undefined;

    return PetProfileMapper.mapToDomainEntity(entity);
  }

  public async deleteOne(id: string): Promise<void> {
    const relationalDBcallback = async (manager: EntityManager) => {
      await manager.delete(PetProfileOrmEntity, { id });
    };

    const graphDBcallback = async (queryRunner: Transaction) => {
      await this._graphDBRepository.deleteOneInTransaction(queryRunner, id);
    };

    await this._transactionRunner.run(relationalDBcallback, graphDBcallback);
  }
}
