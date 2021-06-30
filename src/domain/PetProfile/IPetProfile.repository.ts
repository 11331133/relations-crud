import { IProfileRepository } from '../common/IProfileRepository';
import { PetProfile } from './PetProfile.entity';

export type IPetProfileRepository = IProfileRepository<PetProfile>;
