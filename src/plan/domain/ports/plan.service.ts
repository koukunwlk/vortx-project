import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanInputParams } from '../model/entity/plan.model';
import { PlanRepository } from './Plan.repository';
import { PlanMapper } from './PlanMapper.mapper';

@Injectable()
export class PlanService {
	constructor(
		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository
	){}

	async getAllPlans() {
		const persistencePlans = await this.planRepository.findAll()
		if(!persistencePlans) {
			return 
		}
		return PlanMapper.manyToModel(persistencePlans)
	}

	async getPlan(options: Partial<PlanInputParams>): Promise<Plan> {
		const persistencePlan = await this.planRepository.findOne(options)
		if(!persistencePlan) {
			return 
		}
		return PlanMapper.toModel(persistencePlan)
	}

	async getPlans(options: Partial<PlanInputParams>): Promise<Plan[]> {
		const persistencePlans = await this.planRepository.findMany(options)
		if(!persistencePlans) {
			return 
		}
		return PlanMapper.manyToModel(persistencePlans)
	}

	async createPlan(plan: Plan): Promise<void> {
		const planToPersist = plan.toPersistence()
		
		await this.planRepository.persist(planToPersist)
	}

	async updatePlan(plan: Plan): Promise<void> {
		await this.planRepository.update(plan)
	}
}
