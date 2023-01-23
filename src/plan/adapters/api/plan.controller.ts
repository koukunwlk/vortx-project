import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanRepository } from 'src/plan/domain/ports/Plan.repository';
import { PlanMapper } from 'src/plan/domain/ports/PlanMapper.mapper';

@Controller('plan')
@ApiTags('Plan endpoints')
export class PlanController {
  constructor(private readonly planRepository: PlanRepository) {}

  @Get()
  @ApiResponse({
    description: 'Return all active plans',
  })
  async getAllPlans() {
    const plans = await this.planRepository.findMany();
    return PlanMapper.manyToOutput(plans);
  }
}
