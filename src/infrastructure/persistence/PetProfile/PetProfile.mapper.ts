import { PetProfile } from '../../../domain/PetProfile/PetProfile.entity';
import { PetProfileOrmEntity } from './PetProfile.orm-entity';

export class PetProfileMapper {
  public static mapToOrmEntity(profile: PetProfile) {
    const entity = new PetProfileOrmEntity();
    entity.id = profile.id;
    entity.name = profile.name;
    entity.birthday = profile.birthday;

    return entity;
  }

  public static mapToDomainEntity(profile: PetProfileOrmEntity) {
    return new PetProfile(profile.name, profile.birthday, profile.id);
  }
}
