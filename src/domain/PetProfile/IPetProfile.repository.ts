import { IProfileRepository } from '../common/IProfileRepository';
import { PetProfile } from './PetProfile.entity';

export interface IPetProfileRepository extends IProfileRepository<PetProfile> {}
