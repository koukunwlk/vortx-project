import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanInputParams } from '../model/entity/plan.model';
import { PlanRepository } from './Plan.repository';

@Injectable()
export class PlanService {
	constructor(
		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository
	){}

	async getAllPlans() {
		const persistencePlan = await this.planRepository.findAll()

		return persistencePlan.map(({name, freeMinutes, id}) => Plan.create({name, freeMinutes}, id))
	}

	async getPlan(options: Partial<PlanInputParams>): Promise<Plan> {
		const persistencePlan = await this.planRepository.findOne(options)

		return Plan.create(persistencePlan, persistencePlan.id)
	}

	async getPlans(options: Partial<PlanInputParams>): Promise<Plan[]> {
		const persistencePlans = await this.planRepository.findMany(options)

		return persistencePlans.map(plan => Plan.create(plan, plan.id))
	}

	async createPlan(plan: Plan): Promise<void> {
		const planToPersist = plan.toPersistence()
		
		await this.planRepository.persist(planToPersist)
	}

	async updatePlan(plan: Plan): Promise<void> {
		await this.planRepository.update(plan)
	}
}
