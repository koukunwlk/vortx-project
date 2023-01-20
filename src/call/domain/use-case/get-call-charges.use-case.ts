import { BadRequestException, Inject } from "@nestjs/common";
import { Plan } from "../../../plan/domain/model/entity/plan.model";
import { PlanService } from "../../../plan/domain/ports/plan.service";
import { Tariff } from "../../../tariff/domain/models/tariff.model";
import { TariffService } from "../../../tariff/domain/ports/tariff.service";
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

	async execute({origin, destination, planName, durationInMinutes}: IGetCallChargesInput) {
		const plan = await this.planService.getPlan({name: planName})
		this.throwExceptionIfPlanNotExits(plan)

		const tariff = await this.tariffService.getTariff({origin, destination})
		this.throwExceptionIfTariffNotExits(tariff)
		
		const call = new Call({tariff, plan, durationInMinutes})

		return this.buildResponse(call, tariff, plan)
	}

	private throwExceptionIfPlanNotExits(plan: Plan){
		if(!plan) {
			throw new BadRequestException("plan not found")
		}
	}

	private throwExceptionIfTariffNotExits(tariff: Tariff){
		if(!tariff) {
			throw new BadRequestException("tariff not found")
		}
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