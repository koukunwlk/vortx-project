import { Plan } from "src/plan/domain/models/plan.model";
import { Tariff } from "src/tariff/domain/models/tariff.model";

export interface CreateCallInput {
	tariff: Tariff
	plan: Plan
	durationInMinutes: number;
}
