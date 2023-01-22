import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PlanMapper } from "../../../plan/domain/ports/PlanMapper.mapper";
import { TariffMapper } from "../../../tariff/domain/ports/tariff.mapper";
import { Plan } from "../../../plan/domain/model/entity/plan.model";
import { Tariff } from "../../../tariff/domain/model/entity/tariff.model";
import { Call } from "../model/entity/call.model";
import { CallService } from "../ports/call.service";
import { GetCallChargesOutput } from "./get-call-charges.dto.output";
import { TariffRepository } from "../../../tariff/domain/ports/tariff.repository";
import { PlanRepository } from "../../../plan/domain/ports/Plan.repository";


interface IGetCallChargesInput {
	origin: string
	destination: string
	planName: string
	durationInMinutes: number
}

@Injectable()
export class GetCallChargesUseCase {
	constructor(
		@Inject(TariffRepository)
		private readonly tariffRepository: TariffRepository,

		@Inject(PlanRepository)
		private readonly planRepository: PlanRepository,
	){}

	async execute({origin, destination, planName, durationInMinutes}: IGetCallChargesInput) : Promise<GetCallChargesOutput> {
		const [plan, tariff] = await Promise.all([
			this.planRepository.findOne({name: planName}),
			this.tariffRepository.findOne({origin, destination})
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

	private buildResponse(call: Call, tariff: Tariff, plan: Plan): GetCallChargesOutput {
		const charges = CallService.getCallCharges(plan, tariff, call)
		const {origin, destination} = TariffMapper.toOutput(tariff)
		const {name} = PlanMapper.toOutput(plan)

		return {
			origin,
			destination,
			planName: name.value,
			charges
		}
	}
}