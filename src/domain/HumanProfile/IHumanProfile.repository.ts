import { IProfileRepository } from '../common/IProfileRepository';
import { HumanProfile } from './HumanProfile.entity';

export interface IHumanProfileRepository
  extends IProfileRepository<HumanProfile> {}
