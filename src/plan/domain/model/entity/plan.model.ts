import { Model } from "../../../../common/domain/model";
import { PlanFreeMinutes } from "../value-object/plan-free-minutes.vo";
import { PlanName } from "../value-object/plan-name.vo";

export type PlanProps = {
	name: PlanName
	freeMinutes: PlanFreeMinutes;
	minutesSurplusPercentageSurcharge: number
}

export type PlanInputParams = {
	name: string,
	freeMinutes: number
}

export class Plan extends Model<PlanProps> {
	protected props = {} as PlanProps

	private constructor({name, freeMinutes} : Omit<PlanProps, "minutesSurplusPercentageSurcharge">, id?: string) {
		super(id)
		this.props.name = name
		this.props.freeMinutes = freeMinutes
		this.props.minutesSurplusPercentageSurcharge = 10
	}

	static create({name, freeMinutes}: PlanInputParams, id?: string) {
		return new Plan({
			name: PlanName.create(name),
			freeMinutes: PlanFreeMinutes.create(freeMinutes)
		}, id)
	}

	getPlanMinutesDiscount() {
		return this.props.freeMinutes.value
	}

	getPercentageSurcharge() {
		return this.props.minutesSurplusPercentageSurcharge
	}
}