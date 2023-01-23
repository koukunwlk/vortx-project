import { Tariff } from '../model/entity/tariff.model';
import { PersistenceTariff } from './tariff.repository';

export class TariffMapper {
  static toEntity(model: Tariff): PersistenceTariff {
    const { id, origin, destination, valuePerMinute } = model.toPersistence();
    return {
      id,
      origin: origin.value,
      destination: destination.value,
      valuePerMinute: Number(valuePerMinute.value),
    };
  }

  static toOutput(model: Tariff) {
    const { id, origin, destination, valuePerMinute } = model.toJson();
    return {
      id,
      origin: origin.value,
      destination: destination.value,
      valuePerMinute: valuePerMinute.value,
    };
  }

  static manyToOutput(models: Tariff[]) {
    return models.map(this.toOutput);
  }

  static toModel(entity: PersistenceTariff): Tariff {
    const { id, origin, destination, valuePerMinute } = entity;
    return Tariff.create(
      {
        origin,
        destination,
        valuePerMinute,
      },
      id,
    );
  }

  static manyToModel(entities: PersistenceTariff[]): Tariff[] {
    return entities.map(this.toModel);
  }

  static manyToEntity(models: Tariff[]): PersistenceTariff[] {
    return models.map(this.toEntity);
  }
}
