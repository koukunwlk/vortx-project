import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanService } from '../../domain/ports/plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getAllPlans() {
	this.planService.createAllPlans()
	const plans = await this.planService.getAllPlans()
	return plans.map(plan => plan.toJson())
  }

}
