import { Model } from '../../../../common/domain/model';
import { CreateTariffInput } from '../../dto/input/create-tariff.input';
import { CallDdd } from '../value-object/call-ddd.vo';
import { MinutePrice } from '../value-object/minute-price.vo';

export type TariffProps = {
  origin: CallDdd;
  destination: CallDdd;
  valuePerMinute: MinutePrice;
};

export class Tariff extends Model<TariffProps> {
  protected props = {} as TariffProps;

  private constructor(
    { origin, destination, valuePerMinute }: TariffProps,
    id?: string,
  ) {
    super(id);
    this.props.origin = origin;
    this.props.destination = destination;
    this.props.valuePerMinute = valuePerMinute;
  }

  static create(
    { origin, destination, valuePerMinute }: CreateTariffInput,
    id?: string,
  ) {
    return new Tariff(
      {
        origin: CallDdd.create(origin),
        destination: CallDdd.create(destination),
        valuePerMinute: MinutePrice.create(valuePerMinute),
      },
      id,
    );
  }

  getTotalValue(minutes: number): number {
    if (minutes <= 0) {
      return 0;
    }
    return this.props.valuePerMinute.value * minutes;
  }
}
