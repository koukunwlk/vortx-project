import { Injectable, Inject } from "@nestjs/common";
import { Tariff } from "../models/tariff.model";
import { TariffRepository } from "./tariff.repository";

@Injectable()
export class TariffService {
	constructor(
		@Inject(TariffRepository)
		private readonly tariffRepository: TariffRepository
	){
		{
			this.createAllTariffs()
		}
	}

	async getAllTariffs() {
		const persistenceTariffs = await this.tariffRepository.findAll()
		return persistenceTariffs.map(tariff => new Tariff(tariff, tariff.id))
	}

	async getTariff(options: Record<string, unknown>) {
		const persistenceTariff = await this.tariffRepository.findOne(options)

		return new Tariff(persistenceTariff, persistenceTariff.id)
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
			const tariffModel = new Tariff(tariff)
			await this.tariffRepository.persist(tariffModel)
		})
	}
}