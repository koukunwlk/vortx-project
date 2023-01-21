import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { CreateTariffInput } from "../dto/input/create-tariff.input";
import { Tariff } from "../model/entity/tariff.model";
import { TariffMapper } from "./tariff.mapper";
import { TariffRepository } from "./tariff.repository";

@Injectable()
export class TariffService {
	constructor(
		@Inject(TariffRepository)
		private readonly tariffRepository: TariffRepository
	){}

	async getAllTariffs(): Promise<Tariff[]> {
		const persistenceTariffs = await this.tariffRepository.findAll()
		
		return TariffMapper.manyToModel(persistenceTariffs)
	}

	async getTariff(options: Partial<CreateTariffInput>):  Promise<Tariff> {
		const persistenceTariff = await this.tariffRepository.findOne(options)

		return TariffMapper.toModel(persistenceTariff)
	}

	async getTariffs(options:  Partial<CreateTariffInput>): Promise<Tariff[]> {
		const persistenceTariffs = await this.tariffRepository.findMany(options)

		return TariffMapper.manyToModel(persistenceTariffs)
	}

	async createTariff(tariff: Tariff): Promise<void> {
		const persistenceTariff = TariffMapper.toEntity(tariff)
		await this.tariffRepository.persist(persistenceTariff)
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
			const persistenceTariff = TariffMapper.toEntity(tariffModel)
			await this.tariffRepository.persist(persistenceTariff)
		})
	}
}