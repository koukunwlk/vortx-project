import { Tariff } from "../models/tariff.model"

export type TariffPersistence = {
	id: string
	origin: string,
	destination: string,
	valuePerMinute: number
}

export abstract class TariffRepository {
	abstract find(options: Partial<TariffPersistence>): TariffPersistence
	abstract findAll(): TariffPersistence[]
	abstract create(tariff: Tariff): void
}