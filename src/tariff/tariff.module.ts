import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffController } from './adapter/api/tariff.controller';
import { TypeOrmTariff } from './adapter/db/typeorm/entities/typeorm-tariff.entity';
import { TariffRepositoryProvider } from './domain/ports/tariff.repository.provider';

@Module({
  controllers: [TariffController],
  imports: [TypeOrmModule.forFeature([TypeOrmTariff])],
  providers: [TariffRepositoryProvider],
  exports: [TariffRepositoryProvider],
})
export class TariffModule {}
