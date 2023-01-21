import { Module } from '@nestjs/common';
import { PlanModule } from '../plan/plan.module';
import { TariffModule } from '../tariff/tariff.module';
import { CallController } from './adapters/api/call.controller';
import { GetCallChargesUseCase } from './domain/use-case/get-call-charges.use-case';

@Module({
  controllers: [CallController],
  imports: [PlanModule, TariffModule],
  providers: [GetCallChargesUseCase]
})
export class CallModule {}
