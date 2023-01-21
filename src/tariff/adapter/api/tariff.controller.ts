import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { type } from "os";
import { TariffMapper } from "src/tariff/domain/ports/tariff.mapper";
import { TariffService } from "../../domain/ports/tariff.service";

@Controller('tariff')
@ApiTags("Tariff endpoints")
export class TariffController{
	@Inject(TariffService)
	private readonly tariffService: TariffService

	@Get()
	@ApiResponse({
		description: "Return actives tariffs"
	})
	async getAllTariffs(){
		const tariffs =  await this.tariffService.getAllTariffs()
		return TariffMapper.manyToOutput(tariffs)
	}
}