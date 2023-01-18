import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { TariffService } from "src/tariff/domain/ports/tariff.service";

@Controller('tariffs')
export class TariffController{
	@Inject(TariffService)
	private readonly tariffService: TariffService

	@Get()
	getAllTariffs(){
		this.tariffService.createAllTariffs()
		const tariffs =  this.tariffService.getAllTariffs()
		return tariffs.map(tariff => tariff.toJson())
	}
}