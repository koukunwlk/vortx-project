import { Tariff } from "../model/entity/tariff.model"

export type PersistenceTariff = {
	id: string
	origin: string,
	destination: string,
	valuePerMinute: number
}

export abstract class TariffRepository {
	abstract findOne(options: Partial<PersistenceTariff>): Promise<PersistenceTariff>
	abstract findMany(options: Partial<PersistenceTariff>): Promise<PersistenceTariff[]>
	abstract findAll(): Promise<PersistenceTariff[]>
	abstract persist(tariff: Tariff): Promise<void>
	abstract update(tariff: Tariff): Promise<void>
}