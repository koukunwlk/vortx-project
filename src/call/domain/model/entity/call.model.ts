import { Model } from "../../../../common/domain/model";
import { Plan } from "../../../../plan/domain/model/entity/plan.model";
import { Tariff } from "../../../../tariff/domain/model/entity/tariff.model";
import { CallDurationInMinutes } from "../value-objects/call-duration-in-minutes.vo";

export type CallProps = {
	durationInMinutes: CallDurationInMinutes;
}

type CreateCallInput = {
	durationInMinutes: number
}

export class Call extends Model<CallProps> {
	protected props: CallProps = {} as CallProps; 
	private constructor({durationInMinutes}: CallProps, id?: string) {
		super(id);
		this.props.durationInMinutes = durationInMinutes
	}

	static create({durationInMinutes}: CreateCallInput) {
		return new Call({
			durationInMinutes: CallDurationInMinutes.create(durationInMinutes)
		})
	}

	getCallDuration() {
		return this.props.durationInMinutes.value
	}
}