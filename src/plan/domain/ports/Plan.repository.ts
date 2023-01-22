import { Plan } from "../model/entity/plan.model";

export type PersistencePlan = {
	id?: string,
	name: string,
	freeMinutes: number
}

export type ListPlanOptions = {
	id?: string,
	name: string,
	freeMinutes: number
}

export abstract class PlanRepository {
	abstract findOne(options: Partial<ListPlanOptions>): Promise<Plan>
	abstract findMany(options?: Partial<ListPlanOptions>): Promise<Plan[]>
	abstract persist(plan: Plan):  Promise<void>
	abstract update(plan: Plan):  Promise<void>
}