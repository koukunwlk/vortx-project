import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { CreateTariffInput } from "../dto/input/create-tariff.input";
import { Tariff } from "../model/entity/tariff.model";
import { TariffRepository } from "./tariff.repository";

@Injectable()
export class TariffService {
	constructor(
		@Inject(TariffRepository)
		private readonly tariffRepository: TariffRepository
	){}

	async getAllTariffs(): Promise<Tariff[]> {
		const persistenceTariffs = await this.tariffRepository.findAll()
		
		return persistenceTariffs.map(tariff => Tariff.create(tariff, tariff.id))
	}

	async getTariff(options: Partial<CreateTariffInput>):  Promise<Tariff> {
		const persistenceTariff = await this.tariffRepository.findOne(options)

		return Tariff.create(persistenceTariff, persistenceTariff.id)
	}

	async getTariffs(options:  Partial<CreateTariffInput>): Promise<Tariff[]> {
		const persistenceTariffs = await this.tariffRepository.findMany(options)

		return persistenceTariffs.map(tariff => Tariff.create(tariff, tariff.id))
	}

	async createTariff(tariff: Tariff): Promise<void> {
		await this.tariffRepository.persist(tariff)
	}

	createAllTariffs() {
		const tariffs = [
			{
				origin: "011",
				destination: "016",
				valuePerMinute: 1.90
			},
			{
				origin: "016",
				destination: "011",
				valuePerMinute: 2.90
			},
			{
				origin: "011",
				destination: "017",
				valuePerMinute: 1.70
			}
			,{
				origin: "017",
				destination: "011",
				valuePerMinute: 2.70
			}
		]

		tariffs.forEach(async tariff => {
			const tariffModel = Tariff.create(tariff)
			await this.tariffRepository.persist(tariffModel)
		})
	}
}