import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanProps } from '../models/plan.model';
import { PlanRepository } from './Plan.repository';

@Injectable()
export class PlanService {
	constructor(
		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository
	){
		this.createAllPlans()
	}
	getAllPlans() {
		const persistencePlan = this.planRepository.findAll()

		return persistencePlan.map(({name, durationInMinutes, id}) => new Plan({name, durationInMinutes}, id))
	}

	getPlan(options: Record<string, unknown>): Plan {
		const persistencePlan = this.planRepository.find(options)

		return new Plan(persistencePlan, persistencePlan.id)
	}

	createAllPlans() {
		const plans = [
			{
				name: "FaleMais30",
				durationInMinutes: 30
			},
			{
				name: "FaleMais60",
				durationInMinutes: 60
			},			
			{
				name: "FaleMais120",
				durationInMinutes: 120
			},
		]
		plans.forEach(plan => {
			const planModel = new Plan(plan)
			this.planRepository.create(planModel)
		})
	}
}
