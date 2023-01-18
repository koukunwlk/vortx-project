import { Inject } from "@nestjs/common";
import { Plan } from "src/plan/domain/models/plan.model";
import { PlanService } from "src/plan/domain/ports/plan.service";
import { Tariff } from "src/tariff/domain/models/tariff.model";
import { TariffService } from "src/tariff/domain/ports/tariff.service";
import { Call } from "../models/call.model";

export class GetCallChargesUseCase {
	constructor(
		@Inject(TariffService)
		private readonly tariffService: TariffService,

		@Inject(PlanService)
		private readonly planService: PlanService
	){}

	execute() {
		const plans = this.planService.getAllPlans()
		const plan =  this.planService.getPlan({id: plans[0].id})
		const tariffs = this.tariffService.getAllTariffs()
		const tariff = this.tariffService.getTariff({id: tariffs[0].id})

		const call = new Call({tariff, plan, durationInMinutes: 30})
		return this.buildResponse(call, tariff, plan)
	}

	private buildResponse(call: Call, tariff: Tariff, plan: Plan): Record<string, unknown> {
		const charges = call.getCallCharges()
		const {origin, destination} = tariff.toJson()
		const {name} = plan.toJson()

		return {
			origin,
			destination,
			planName: name,
			charges
		}
	}
}