import { HumanProfile } from '../../../Human/HumanProfile/domain/HumanProfile.entity';
import { HumanProfileOrmEntity } from './HumanProfile.orm-entity';

export class HumanProfileMapper {
  public static mapToOrmEntity(profile: HumanProfile) {
    const entity = new HumanProfileOrmEntity();
    entity.id = profile.id;
    entity.birthday = profile.birthday;
    entity.name = profile.name;
    entity.surname = profile.surname;
    entity.middlename = profile.middlename;

    return entity;
  }

  public static mapToDomainEntity(ormEntity: HumanProfileOrmEntity) {
    return new HumanProfile(
      ormEntity.name,
      ormEntity.middlename,
      ormEntity.surname,
      ormEntity.birthday,
      ormEntity.id,
    );
  }
}
