import { Module } from '@nestjs/common';
import { PlanService } from './domain/ports/plan.service';
import { PlanController } from './adapters/api/plan.controller';
import { PlanRepository } from './domain/ports/Plan.repository';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmPlan } from './adapters/db/typeorm/entities/typeorm-plan.entity';
import { TypeOrmPlanRepository } from './adapters/db/typeorm/repositories/typeorm-plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPlan])],
  controllers: [PlanController],
  providers: [PlanService, {
	provide: PlanRepository,
	useClass: TypeOrmPlanRepository
  }],
  exports: [PlanService]
})
export class PlanModule {}
