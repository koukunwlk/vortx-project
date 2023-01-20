import { Plan } from "../models/plan.model";

export type PersistencePlan = {
	id?: string,
	name: string,
	freeMinutes: number
}

export abstract class PlanRepository {
	abstract findAll():  Promise<PersistencePlan[]>
	abstract findOne(options: Partial<PersistencePlan>): Promise<PersistencePlan>
	abstract findMany(options: Partial<PersistencePlan>): Promise<PersistencePlan[]>
	abstract persist(plan: Plan):  Promise<void>
	abstract update(plan: Plan):  Promise<void>
}