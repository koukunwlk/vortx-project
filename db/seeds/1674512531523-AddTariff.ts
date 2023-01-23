import { MigrationInterface } from 'typeorm';
import * as seed from '../../src/seed.config';
import { TypeOrmTariff } from 'src/tariff/adapter/db/typeorm/entities/typeorm-tariff.entity';
import { Tariff } from 'src/tariff/domain/model/entity/tariff.model';
import { TariffMapper } from 'src/tariff/domain/ports/tariff.mapper';

export class AddTariff1674512531523 implements MigrationInterface {
	private readonly tariffRepository =
    seed.default.getRepository<TypeOrmTariff>(TypeOrmTariff);
  public async up(): Promise<void> {
    const tariffs = [
      {
        origin: '011',
        destination: '016',
        valuePerMinute: 1.9,
      },
      {
        origin: '016',
        destination: '011',
        valuePerMinute: 2.9,
      },
      {
        origin: '011',
        destination: '017',
        valuePerMinute: 1.7,
      },
      {
        origin: '017',
        destination: '011',
        valuePerMinute: 2.7,
      },
      {
        origin: '011',
        destination: '018',
        valuePerMinute: 0.9,
      },
      {
        origin: '018',
        destination: '011',
        valuePerMinute: 1.9,
      },
    ];

    tariffs.forEach(async (tariff) => {
      const tariffModel = Tariff.create(tariff);
      await this.tariffRepository.save(TariffMapper.toEntity(tariffModel));
    });
  }

  public async down(): Promise<void> {
    Promise.resolve();
  }
}
