import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { TariffService } from "../../domain/ports/tariff.service";

@Controller('tariff')
export class TariffController{
	@Inject(TariffService)
	private readonly tariffService: TariffService

	@Get()
	async getAllTariffs(){
		const tariffs =  await this.tariffService.getAllTariffs()
		return tariffs.map(tariff => tariff.toJson())
	}
}