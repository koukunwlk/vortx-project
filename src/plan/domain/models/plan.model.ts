import { Model } from "../../../common/domain/model";
import { PersistencePlan } from "../ports/Plan.repository";

export type PlanProps = {
	name: string
	freeMinutes: number;
}

export class Plan extends Model<PlanProps> {
	protected props = {} as PlanProps

	constructor({name, freeMinutes} : PlanProps, id?: string) {
		super(id)
		this.props.name = name
		this.props.freeMinutes = freeMinutes
	}

	getPlanMinutesDiscount() {
		return this.props.freeMinutes
	}
}