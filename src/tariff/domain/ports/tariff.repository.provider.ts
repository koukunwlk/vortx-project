import { ClassProvider } from "@nestjs/common";
import { TypeOrmTariffRepository } from "../../adapter/db/typeorm/repositories/typeorm-tariff.repository";
import { TariffRepository } from "./tariff.repository";

export class TariffRepositoryProvider implements ClassProvider<TariffRepository> {
	provide = TariffRepository
	useClass = TypeOrmTariffRepository
}