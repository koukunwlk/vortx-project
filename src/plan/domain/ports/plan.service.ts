import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanProps } from '../models/plan.model';
import { PersistencePlan, PlanRepository } from './Plan.repository';

@Injectable()
export class PlanService {
	constructor(
		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository
	){
		this.createAllPlans()
	}
	async getAllPlans() {
		const persistencePlan = await this.planRepository.findAll()

		return persistencePlan.map(({name, freeMinutes, id}) => new Plan({name, freeMinutes}, id))
	}

	async getPlan(options: Record<string, unknown>): Promise<Plan> {
		const persistencePlan = await this.planRepository.findOne(options)

		return new Plan(persistencePlan, persistencePlan.id)
	}

	async createAllPlans() {
		const plans = [
			{
				name: "FaleMais30",
				freeMinutes: 30
			},
			{
				name: "FaleMais60",
				freeMinutes: 60
			},			
			{
				name: "FaleMais120",
				freeMinutes: 120
			},
		]
		plans.forEach(async plan => {
			const planModel = new Plan(plan)
			await this.planRepository.persist(planModel)
		})
	}
}
