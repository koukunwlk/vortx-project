import { Model } from "../../../common/domain/model";
import { PlanModel } from "../../../plan/domain/models/plan.model";
import { TariffModel } from "../../../tariff/domain/models/tariff.model";
import { CreateCallInput } from "../dto/input/create-call.input";

type CallProps = {
	tariff: TariffModel
	plan?: PlanModel
	durationInMinutes: number;
}

type CallCharges = {
	withPlan: number;
	withoutPlan: number;
}

export class CallModel extends Model<CallProps> {
	protected props: CallProps = {} as CallProps; 
	constructor({tariff, plan, durationInMinutes}: CreateCallInput, id?: string) {
		super(id);
		this.props.tariff = tariff
		this.props.plan = plan
		this.props.durationInMinutes = durationInMinutes
	}

	getCallCharges(): CallCharges{
		const minutesDiscount = this.props.plan.getPlanMinutesDiscount()

		return {
			withPlan: this.calculateCallCost(this.props.durationInMinutes - minutesDiscount),
			withoutPlan: this.calculateCallCost(this.props.durationInMinutes)
		}
	}

	private calculateCallCost(minutes: number) {
		return this.props.tariff.getTotalValue(minutes)
	}
}