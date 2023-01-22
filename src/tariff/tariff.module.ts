import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffController } from './adapter/api/tariff.controller';
import { TypeOrmTariff } from './adapter/db/typeorm/entities/typeorm-tariff.entity';
import { TypeOrmTariffRepository } from './adapter/db/typeorm/repositories/typeorm-tariff.repository';
import { TariffRepository } from './domain/ports/tariff.repository';
import { TariffRepositoryProvider } from './domain/ports/tariff.repository.provider';

@Module({
  controllers: [TariffController],
  imports: [TypeOrmModule.forFeature([TypeOrmTariff])],
  providers: [TariffRepositoryProvider],
  exports: [TariffRepositoryProvider],
})
export class TariffModule {}
