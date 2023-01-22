import { Injectable } from '@nestjs/common';
import { Tariff } from '../model/entity/tariff.model';

export type ListTariffOptions = {
  id: string;
  origin: string;
  destination: string;
  valuePerMinute: number;
};

export type PersistenceTariff = {
  id: string;
  origin: string;
  destination: string;
  valuePerMinute: number;
};

@Injectable()
export abstract class TariffRepository {
  abstract findOne(options: Partial<ListTariffOptions>): Promise<Tariff>;
  abstract findMany(options?: Partial<ListTariffOptions>): Promise<Tariff[]>;
  abstract persist(newTariff: Tariff): Promise<void>;
  abstract update(newTariff: Tariff): Promise<void>;
}
