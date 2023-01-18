import { Module } from '@nestjs/common';
import { TariffController } from './adapter/api/tariff.controller';
import { TariffInMemoryRepository } from './adapter/db/in-memory.repository';
import { TariffRepository } from './domain/ports/tariff.repository';
import { TariffService } from './domain/ports/tariff.service';

@Module({
  controllers: [TariffController],
  providers: [TariffService, {
	provide: TariffRepository,
	useClass: TariffInMemoryRepository
  }],
  exports: [TariffService]
})
export class TariffModule {}
