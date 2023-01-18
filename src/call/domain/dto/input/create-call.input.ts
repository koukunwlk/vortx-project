import { PlanModel } from "src/plan/domain/models/plan.model";
import { TariffModel } from "src/tariff/domain/models/tariff.model";

export interface CreateCallInput {
	tariff: TariffModel
	plan: PlanModel
	durationInMinutes: number;
}
