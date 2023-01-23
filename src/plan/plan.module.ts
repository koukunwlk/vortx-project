import { Module } from '@nestjs/common';
import { PlanController } from './adapters/api/plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPlan } from './adapters/db/typeorm/entities/typeorm-plan.entity';
import { PlanRepositoryProvider } from './domain/ports/plan.repository.provider';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPlan])],
  controllers: [PlanController],
  providers: [PlanRepositoryProvider],
  exports: [PlanRepositoryProvider],
})
export class PlanModule {}
