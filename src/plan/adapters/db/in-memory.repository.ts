import { Injectable } from "@nestjs/common";
import { Plan } from "src/plan/domain/models/plan.model";
import { PersistencePlan, PlanRepository } from "src/plan/domain/ports/Plan.repository";



@Injectable()
export class PlanInMemory extends PlanRepository {
	private plans = []

	findAll(): PersistencePlan[] {
		return this.plans
	}

	find(options: Partial<PersistencePlan>):  PersistencePlan {
		return this.plans.filter(plan => plan.name === options.name)[0]
	}

	create(plan: Plan): void {
		this.plans.push(plan.toPersistence())
	}
}