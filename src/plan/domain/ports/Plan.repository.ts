import { Plan } from "../models/plan.model";

export type PersistencePlan = {
	id?: string,
	name: string,
	durationInMinutes: number
}

export abstract class PlanRepository {
	abstract findAll():  PersistencePlan[]
	abstract find (options: Partial<PersistencePlan>): PersistencePlan
	abstract create(plan: Plan):  void
}