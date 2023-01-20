import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "src/plan/domain/model/entity/plan.model";
import { PersistencePlan, PlanRepository } from "src/plan/domain/ports/Plan.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import { TypeOrmPlan } from "../entities/typeorm-plan.entity";

export class TypeOrmPlanRepository implements PlanRepository {
	constructor(
		@InjectRepository(TypeOrmPlan)
		private readonly typeormRepository: Repository<TypeOrmPlan>
	){}

	async findOne(options: FindOptionsWhere<TypeOrmPlan>): Promise<PersistencePlan> {
		const persistencePlan = await this.typeormRepository.findOne({
			where: options
		})

		return persistencePlan
	}

	async findMany(options: FindOptionsWhere<TypeOrmPlan>): Promise<PersistencePlan[]> {
		const persistencePlan = await this.typeormRepository.find({
			where: options
		})

		return persistencePlan
	}

	async findAll() {
		return await this.typeormRepository.find()
	}

	async persist(plan: Plan) {
		const persistencePlan = plan.toPersistence()

		await this.typeormRepository.insert(persistencePlan)
	}

	async update(plan: Plan) {
		const persistencePlan = plan.toPersistence()
		
		await this.typeormRepository.update(persistencePlan.id, persistencePlan)
	}
}