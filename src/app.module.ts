import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TariffModule } from './tariff/tariff.module';
import { PlanModule } from './plan/plan.module';
import { CallModule } from './call/call.module';
import { TypeOrmConfigModule } from './typeorm-database.module';

@Module({
  imports: [CallModule, TariffModule, PlanModule, TypeOrmConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
