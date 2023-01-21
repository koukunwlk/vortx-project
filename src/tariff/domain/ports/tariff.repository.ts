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
	abstract persist(persistenceTariff: PersistenceTariff): Promise<void>
	abstract update(persistenceTariff: PersistenceTariff): Promise<void>
}