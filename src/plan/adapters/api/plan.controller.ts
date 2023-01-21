import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanMapper } from 'src/plan/domain/ports/PlanMapper.mapper';
import { PlanService } from '../../domain/ports/plan.service';

@Controller('plan')
@ApiTags("Plan endpoints")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @ApiResponse({
	description: "Return all active plans"
  })
  async getAllPlans() {
	const plans = await this.planService.getAllPlans()
	return PlanMapper.manyToOutput(plans)
  }

}
