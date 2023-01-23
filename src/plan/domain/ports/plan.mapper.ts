import { Plan } from '../model/entity/plan.model';
import { PersistencePlan } from './Plan.repository';

export class PlanMapper {
  static toEntity(model: Plan): PersistencePlan {
    const { id, name, freeMinutes } = model.toPersistence();
    return {
      id,
      name: name.value,
      freeMinutes: Number(freeMinutes.value),
    };
  }

  static toOutput(model: Plan) {
    const { id, name, freeMinutes } = model.toJson();
    return {
      id,
      name: name.value,
      freeMinutes: freeMinutes.value,
    };
  }

  static manyToOutput(models: Plan[]) {
    return models.map(this.toOutput);
  }

  static toModel(entity: PersistencePlan): Plan {
    const { id, name, freeMinutes } = entity;
    return Plan.create(
      {
        name,
        freeMinutes,
      },
      id,
    );
  }

  static manyToModel(entities: PersistencePlan[]): Plan[] {
    return entities.map(this.toModel);
  }

  static manyToEntity(models: Plan[]): PersistencePlan[] {
    return models.map(this.toEntity);
  }
}
