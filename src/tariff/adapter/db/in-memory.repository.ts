import { Injectable } from "@nestjs/common";
import { Tariff } from "src/tariff/domain/models/tariff.model";
import { TariffPersistence, TariffRepository } from "src/tariff/domain/port/tariff.repository";

@Injectable()
export class TariffInMemoryRepository extends TariffRepository {
	private tariffs = []


	find(options: Partial<TariffPersistence>): TariffPersistence {
		return this.tariffs.filter(tariff => tariff.origin === options.origin && tariff.destination === options.destination)[0]
	}

	findAll(): TariffPersistence[] {
		return this.tariffs
	}

	create(tariff: Tariff): void {
		this.tariffs.push(tariff.toPersistence())
	}
}