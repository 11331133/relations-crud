import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'neo4j-driver-core';
import { EntityManager, Repository } from 'typeorm';
import { HumanProfile } from '../../../Human/HumanProfile/domain/HumanProfile.entity';
import { TransactionRunner } from '../../../_common/infrastructure/persistence/TransactionRunner';
import { IHumanProfileRepository } from '../domain/IHumanProfile.repository';
import { HumanProfileGraphPersistence } from './HumanProfile.graph-persistence';
import { HumanProfileMapper } from './HumanProfile.mapper';
import { HumanProfileOrmEntity } from './HumanProfile.orm-entity';

@Injectable()
export class HumanProfilePersistenceService implements IHumanProfileRepository {
  constructor(
    @InjectRepository(HumanProfileOrmEntity)
    private _relationalDBRepository: Repository<HumanProfileOrmEntity>,
    private _graphDBRepository: HumanProfileGraphPersistence,
    private _transactionRunner: TransactionRunner,
  ) {}

  public async persist(profile: HumanProfile): Promise<void> {
    try {
      await Promise.all([
        this._relationalDBRepository.save(profile),
        this._graphDBRepository.persist(profile),
      ]);
    } catch (error) {
      await Promise.all([
        this._relationalDBRepository.delete(profile.id),
        this._graphDBRepository.deleteOne(profile.id),
      ]);
    }
  }

  public async merge(profile: HumanProfile): Promise<void> {
    await this._relationalDBRepository.save(
      HumanProfileMapper.mapToOrmEntity(profile),
    );
  }

  public async deleteOne(id: string): Promise<void> {
    const relationalDBcallback = async (manager: EntityManager) => {
      await manager.delete(HumanProfileOrmEntity, { id });
    };

    const graphDBcallback = async (queryRunner: Transaction) => {
      await this._graphDBRepository.deleteOneInTransaction(queryRunner, id);
    };

    await this._transactionRunner.run(relationalDBcallback, graphDBcallback);
  }

  public async findOne(id: string): Promise<HumanProfile> {
    const profile = await this._relationalDBRepository.findOne({ id });
    if (!profile) return undefined;

    return HumanProfileMapper.mapToDomainEntity(profile);
  }
}
