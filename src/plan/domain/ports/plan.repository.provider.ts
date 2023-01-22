import { ClassProvider } from '@nestjs/common';
import { TypeOrmPlanRepository } from 'src/plan/adapters/db/typeorm/repositories/typeorm-plan.repository';
import { PlanRepository } from './Plan.repository';

export const PlanRepositoryProvider: ClassProvider = {
  provide: PlanRepository,
  useClass: TypeOrmPlanRepository,
};
