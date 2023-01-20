import { Model } from "../../../common/domain/model";
import { CreateTariffInput } from "../dto/input/create-tariff.input";

export type TariffProps = {
	origin: string
	destination: string;
	valuePerMinute: number;
}

export class Tariff extends Model<TariffProps> {
	protected props = {} as TariffProps

	constructor({origin, destination, valuePerMinute} : CreateTariffInput, id?: string) {
		super(id)
		this.props.origin = origin
		this.props.destination = destination
		this.props.valuePerMinute = valuePerMinute
	}

	getTotalValue(minutes: number): number {
		return (this.props.valuePerMinute * minutes)
	}

}