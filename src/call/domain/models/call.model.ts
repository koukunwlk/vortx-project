import { Model } from "../../../common/domain/model";
import { Plan } from "../../../plan/domain/models/plan.model";
import { Tariff } from "../../../tariff/domain/models/tariff.model";
import { CreateCallInput } from "../dto/input/create-call.input";

type CallProps = {
	tariff: Tariff
	plan: Plan
	durationInMinutes: number;
	percentage: number;
}

type CallCharges = {
	withPlan: number;
	withoutPlan: number;
}

export class Call extends Model<CallProps> {
	protected props: CallProps = {} as CallProps; 
	constructor({tariff, plan, durationInMinutes}: CreateCallInput, id?: string) {
		super(id);
		this.props.tariff = tariff
		this.props.plan = plan
		this.props.durationInMinutes = durationInMinutes
		this.props.percentage = 10
	}

	getCallCharges(): CallCharges{
		const minutesDiscount = this.props.plan.getPlanMinutesDiscount()

		return {
			withPlan: this.calculateCallChargeWithPlan(this.props.durationInMinutes - minutesDiscount),
			withoutPlan: this.calculateCallCharge(this.props.durationInMinutes)
		}
	}

	private calculateCallChargeWithPlan(minutes: number): number {
		if(minutes <= 0) {
			return 0;
		}

		const charge = this.calculateCallCharge(minutes)
		const totalCharge = this.calculatePercentage(charge, this.props.percentage)

		return totalCharge;
	}

	private calculateCallCharge(minutes: number) {
		return this.props.tariff.getTotalValue(minutes)
	}

	private calculatePercentage(value: number, percentage: number): number {
		const additionalValue = (value / 100) * percentage

		return value + additionalValue
	}
}