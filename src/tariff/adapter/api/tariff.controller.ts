import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { TariffService } from "../../domain/ports/tariff.service";

@Controller('tariffs')
export class TariffController{
	@Inject(TariffService)
	private readonly tariffService: TariffService

	@Get()
	async getAllTariffs(){
		this.tariffService.createAllTariffs()
		const tariffs =  await this.tariffService.getAllTariffs()
		return tariffs.map(tariff => tariff.toJson())
	}
}