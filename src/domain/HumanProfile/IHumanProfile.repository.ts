import { IProfileRepository } from '../common/IProfileRepository';
import { HumanProfile } from './HumanProfile.entity';

export type IHumanProfileRepository = IProfileRepository<HumanProfile>;
