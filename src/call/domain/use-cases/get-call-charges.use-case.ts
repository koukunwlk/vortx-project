import { Inject } from "@nestjs/common";
import { Plan } from "src/plan/domain/models/plan.model";
import { PlanService } from "src/plan/domain/ports/plan.service";
import { Tariff } from "src/tariff/domain/models/tariff.model";
import { TariffService } from "src/tariff/domain/ports/tariff.service";
import { Call } from "../models/call.model";


interface IGetCallChargesInput {
	origin: string
	destination: string
	planName: string
	durationInMinutes: number
}

export class GetCallChargesUseCase {
	constructor(
		@Inject(TariffService)
		private readonly tariffService: TariffService,

		@Inject(PlanService)
		private readonly planService: PlanService
	){}

	execute({origin, destination, planName, durationInMinutes}: IGetCallChargesInput) {
		const plan =  this.planService.getPlan({name: planName})
		const tariff = this.tariffService.getTariff({origin, destination})

		const call = new Call({tariff, plan, durationInMinutes})
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