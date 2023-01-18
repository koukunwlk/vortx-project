import { Module } from '@nestjs/common';
import { PlanService } from './domain/ports/plan.service';
import { PlanController } from './adapters/api/plan.controller';
import { PlanRepository } from './domain/ports/Plan.repository';
import { PlanInMemory } from './adapters/db/in-memory.repository';

@Module({
  controllers: [PlanController],
  providers: [PlanService, {
	provide: PlanRepository,
	useClass: PlanInMemory
  }],
  exports: [PlanService]
})
export class PlanModule {}
