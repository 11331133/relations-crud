import { IProfileRepository } from '../../../_common/domain/IProfileRepository';
import { PetProfile } from './PetProfile.entity';

export type IPetProfileRepository = IProfileRepository<PetProfile>;
