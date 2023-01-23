import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmPlan } from 'src/plan/adapters/db/typeorm/entities/typeorm-plan.entity';
import { Plan } from 'src/plan/domain/model/entity/plan.model';
import { PlanMapper } from 'src/plan/domain/ports/plan.mapper';
import { MigrationInterface } from 'typeorm';
import * as seed from '../../src/seed.config';

export class AddPlan1674512519960 implements MigrationInterface {
	@InjectRepository(TypeOrmPlan)
	private readonly planRepository =
	  seed.default.getRepository<TypeOrmPlan>(TypeOrmPlan);
  
	public async up(): Promise<void> {
	  const plans = [
		{
		  name: 'FaleMais30',
		  freeMinutes: 30,
		},
		{
		  name: 'FaleMais60',
		  freeMinutes: 60,
		},
		{
		  name: 'FaleMais120',
		  freeMinutes: 120,
		},
	  ];
  
	  plans.forEach(async (plan) => {
		const planModel = Plan.create(plan);
		await this.planRepository.insert(PlanMapper.toEntity(planModel));
	  });
	}
  
	public async down(): Promise<void> {
	  return Promise.resolve();
	}

}
