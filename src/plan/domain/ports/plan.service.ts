import { Inject, Injectable } from '@nestjs/common';
import { Plan, PlanProps } from '../models/plan.model';
import { PlanRepository } from './Plan.repository';

@Injectable()
export class PlanService {
	@Inject(PlanRepository)
	private readonly planRepository: PlanRepository

	getAllPlans() {
		const persistencePlan = this.planRepository.findAll()

		return persistencePlan.map(({name, durationInMinutes, id}) => new Plan({name, durationInMinutes}, id))
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
		console.log("consturindo planos")
		plans.forEach(plan => {
			const planModel = new Plan(plan)
			this.planRepository.create(planModel)
		})
	}
}
