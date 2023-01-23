import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PlanMapper } from '../../../plan/domain/ports/PlanMapper.mapper';
import { TariffMapper } from '../../../tariff/domain/ports/tariff.mapper';
import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { CallCharges, CallService } from '../ports/call.service';
import { GetCallChargesOutput } from './get-call-charges.dto.output';
import { TariffRepository } from '../../../tariff/domain/ports/tariff.repository';
import { PlanRepository } from '../../../plan/domain/ports/Plan.repository';
import { CallDurationInMinutes } from '../model/value-objects/call-duration-in-minutes.vo';

interface IGetCallChargesInput {
  origin: string;
  destination: string;
  planName: string;
  durationInMinutes: number;
}

@Injectable()
export class GetCallChargesUseCase {
  constructor(
    @Inject(TariffRepository)
    private readonly tariffRepository: TariffRepository,

    @Inject(PlanRepository)
    private readonly planRepository: PlanRepository,
  ) {}

  async execute({
    origin,
    destination,
    planName,
    durationInMinutes,
  }: IGetCallChargesInput): Promise<GetCallChargesOutput> {
    const [plan, tariff] = await Promise.all([
      this.planRepository.findOne({ name: planName }),
      this.tariffRepository.findOne({ origin, destination }),
    ]);
    this.throwExceptionIfPlanNotExits(plan);
    this.throwExceptionIfTariffNotExits(tariff);

	const callDuration = CallDurationInMinutes.create(durationInMinutes)
    const callCharges = CallService.getCallCharges(plan, tariff, callDuration);

    return this.buildResponse(callCharges, tariff, plan, callDuration);
  }

  private throwExceptionIfPlanNotExits(plan: Plan) {
    if (!plan) {
      throw new BadRequestException('plan not found');
    }
  }

  private throwExceptionIfTariffNotExits(tariff: Tariff) {
    if (!tariff) {
      throw new BadRequestException('tariff not found');
    }
  }

  private buildResponse(
    charges: CallCharges,
    tariff: Tariff,
    plan: Plan,
	callDuration: CallDurationInMinutes
  ): GetCallChargesOutput {
    const { origin, destination } = TariffMapper.toOutput(tariff);
    const { name } = PlanMapper.toOutput(plan);

    return {
	  callDuration: callDuration.value,
      origin,
      destination,
      planName: name.value,
      charges,
    };
  }
}
