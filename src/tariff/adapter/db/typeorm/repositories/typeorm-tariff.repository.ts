import { InjectRepository } from "@nestjs/typeorm";
import { Tariff } from "../../../../domain/model/entity/tariff.model";
import { PersistenceTariff } from "src/tariff/domain/ports/tariff.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import { TypeOrmTariff } from "../entities/typeorm-tariff.entity";

export class TypeOrmTariffRepository {
	constructor(
		@InjectRepository(TypeOrmTariff)
		private readonly typeormRepository: Repository<TypeOrmTariff>
	){}

	async findOne(options: FindOptionsWhere<TypeOrmTariff>): Promise<PersistenceTariff> {
		const persistenceTariff = await this.typeormRepository.findOne({
			where: options
		})

		return persistenceTariff
	}

	async findMany(options: FindOptionsWhere<TypeOrmTariff>): Promise<PersistenceTariff[]> {
		const persistenceTariff = await this.typeormRepository.find({
			where: options
		})

		return persistenceTariff
	}

	async findAll() {
		return await this.typeormRepository.find()
	}

	async persist(tariff: Tariff) {
		const persistenceTariff = tariff.toPersistence()

		await this.typeormRepository.insert(persistenceTariff)
	}

	async update(tariff: Tariff) {
		const persistenceTariff = tariff.toPersistence()
		
		await this.typeormRepository.update(persistenceTariff.id, persistenceTariff)
	}
}