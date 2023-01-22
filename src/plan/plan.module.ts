import { Module } from '@nestjs/common';
import { PlanController } from './adapters/api/plan.controller';
import { PlanRepository } from './domain/ports/Plan.repository';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmPlan } from './adapters/db/typeorm/entities/typeorm-plan.entity';
import { TypeOrmPlanRepository } from './adapters/db/typeorm/repositories/typeorm-plan.repository';
import { PlanRepositoryProvider } from './domain/ports/plan.repository.provider';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPlan])],
  controllers: [PlanController],
  providers: [PlanRepositoryProvider],
  exports: [PlanRepositoryProvider]
})
export class PlanModule {}
