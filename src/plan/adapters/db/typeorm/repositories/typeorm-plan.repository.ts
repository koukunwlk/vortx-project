import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/plan/domain/model/entity/plan.model';
import { PlanRepository } from 'src/plan/domain/ports/Plan.repository';
import { PlanMapper } from 'src/plan/domain/ports/PlanMapper.mapper';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TypeOrmPlan } from '../entities/typeorm-plan.entity';

export class TypeOrmPlanRepository implements PlanRepository {
  constructor(
    @InjectRepository(TypeOrmPlan)
    private readonly repository: Repository<TypeOrmPlan>,
  ) {}

  async findOne(options: FindOptionsWhere<TypeOrmPlan>): Promise<Plan> {
    const persistencePlan = await this.repository.findOne({
      where: options,
    });
    if (!persistencePlan) {
      return;
    }
    return PlanMapper.toModel(persistencePlan);
  }

  async findMany(options: FindOptionsWhere<TypeOrmPlan>): Promise<Plan[]> {
    const persistencePlans = await this.repository.find({
      where: options,
    });
    if (!persistencePlans) {
      return;
    }
    return PlanMapper.manyToModel(persistencePlans);
  }

  async persist(plan: Plan) {
    const persistencePlan = PlanMapper.toEntity(plan);

    await this.repository.insert(persistencePlan);
  }

  async update(plan: Plan) {
    const persistencePlan = PlanMapper.toEntity(plan);

    await this.repository.update(persistencePlan.id, persistencePlan);
  }
}
