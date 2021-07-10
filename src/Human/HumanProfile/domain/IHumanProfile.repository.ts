import { IProfileRepository } from '../../../_common/domain/IProfileRepository';
import { HumanProfile } from './HumanProfile.entity';

export type IHumanProfileRepository = IProfileRepository<HumanProfile>;
