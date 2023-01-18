import { Model } from "../../../common/domain/model";
import { PersistencePlan } from "../ports/Plan.repository";

export type PlanProps = {
	name: string
	durationInMinutes: number;
}

export class Plan extends Model<PlanProps> {
	protected props = {} as PlanProps

	constructor({name, durationInMinutes} : PlanProps, id?: string) {
		super(id)
		this.props.name = name
		this.props.durationInMinutes = durationInMinutes
		console.log("inside constructor", this.props)
	}

	getPlanMinutesDiscount() {
		return this.props.durationInMinutes
	}
}