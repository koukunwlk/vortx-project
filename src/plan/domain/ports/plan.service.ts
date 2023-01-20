import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanProps } from '../models/plan.model';
import { PersistencePlan, PlanRepository } from './Plan.repository';

@Injectable()
export class PlanService {
	constructor(
		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository
	){}

	async getAllPlans() {
		const persistencePlan = await this.planRepository.findAll()

		return persistencePlan.map(({name, freeMinutes, id}) => new Plan({name, freeMinutes}, id))
	}

	async getPlan(options: Partial<PlanProps>): Promise<Plan> {
		const persistencePlan = await this.planRepository.findOne(options)

		return new Plan(persistencePlan, persistencePlan.id)
	}

	async getPlans(options: Partial<PlanProps>): Promise<Plan[]> {
		const persistencePlans = await this.planRepository.findMany(options)

		return persistencePlans.map(plan => new Plan(plan, plan.id))
	}

	async createPlan(plan: Plan): Promise<void> {
		const planToPersist = plan.toPersistence()
		
		await this.planRepository.persist(planToPersist)
	}

	async updatePlan(plan: Plan): Promise<void> {
		await this.planRepository.update(plan)
	}
}
