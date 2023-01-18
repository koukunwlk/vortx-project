import { Model } from "../../../common/domain/model";
import { CreatePlanInput } from "../dto/input/create-plan.input";

type PlanProps = {
	name: string
	durationInMinutes: number;
}

export class PlanModel extends Model<PlanProps> {
	protected props = {} as PlanProps

	constructor({name, durationInMinutes} : CreatePlanInput, id?: string) {
		super(id)
		this.props.name = name
		this.props.durationInMinutes = durationInMinutes
	}

	getPlanMinutesDiscount() {
		return this.props.durationInMinutes
	}
}