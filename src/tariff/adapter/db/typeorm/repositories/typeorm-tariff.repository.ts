import { InjectRepository } from '@nestjs/typeorm';
import { Tariff } from '../../../../domain/model/entity/tariff.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TypeOrmTariff } from '../entities/typeorm-tariff.entity';
import { TariffMapper } from '../../../../domain/ports/tariff.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmTariffRepository {
  constructor(
    @InjectRepository(TypeOrmTariff)
    private readonly typeormRepository: Repository<TypeOrmTariff>,
  ) {}

  async findOne(options: FindOptionsWhere<TypeOrmTariff>): Promise<Tariff> {
    const persistenceTariff = await this.typeormRepository.findOne({
      where: options,
    });

    if (!persistenceTariff) {
      return;
    }

    return TariffMapper.toModel(persistenceTariff);
  }

  async findMany(options?: FindOptionsWhere<TypeOrmTariff>): Promise<Tariff[]> {
    const persistenceTariffs = await this.typeormRepository.find({
      where: options,
    });

    if (!persistenceTariffs) {
      return;
    }
	
    return TariffMapper.manyToModel(persistenceTariffs);
  }

  async persist(newTariff: Tariff) {
    const persistenceTariff = TariffMapper.toEntity(newTariff);

    await this.typeormRepository.insert(persistenceTariff);
  }

  async update(newTariff: Tariff) {
    const persistenceTariff = TariffMapper.toEntity(newTariff);

    await this.typeormRepository.update(
      persistenceTariff.id,
      persistenceTariff,
    );
  }
}
