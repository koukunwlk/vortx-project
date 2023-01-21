import { BadRequestException, Inject } from "@nestjs/common";
import { Plan } from "../../../plan/domain/model/entity/plan.model";
import { PlanService } from "../../../plan/domain/ports/plan.service";
import { Tariff } from "../../../tariff/domain/model/entity/tariff.model";
import { TariffService } from "../../../tariff/domain/ports/tariff.service";
import { Call } from "../model/entity/call.model";
import { CallService } from "../ports/call.service";


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
		private readonly planService: PlanService,
	){}

	async execute({origin, destination, planName, durationInMinutes}: IGetCallChargesInput) {
		const [plan, tariff] = await Promise.all([
			this.planService.getPlan({name: planName}),
			this.tariffService.getTariff({origin, destination})
		])	
		this.throwExceptionIfPlanNotExits(plan)
		this.throwExceptionIfTariffNotExits(tariff)
		
		const call = Call.create({durationInMinutes})

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
		const charges = CallService.getCallCharges(plan, tariff, call)
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