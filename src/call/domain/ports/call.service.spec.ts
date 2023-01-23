import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { CallDurationInMinutes } from '../model/value-objects/call-duration-in-minutes.vo';
import { CallService } from './call.service';

const callDurationMock = CallDurationInMinutes.create(61);
const planMock = Plan.create({
  name: 'FaleMais30',
  freeMinutes: 30,
});
const tariffMock = Tariff.create({
  origin: '011',
  destination: '016',
  valuePerMinute: 1.9,
});

describe('CallService UNIT tests', () => {
  describe('validating domain rules', () => {
    it('should calculate the total cost of the call without plan', () => {
      //Arrange
      const chargesService = CallService.getCallCharges(
        planMock,
        tariffMock,
        callDurationMock,
      );

      //Act
      const totalCharges = calculateCharges(
        planMock,
        tariffMock,
        callDurationMock.value,
      );

      //Assert
      expect(chargesService.withoutPlan).toEqual(totalCharges.withoutPlan);
    });

    it('should calculate the total cost of the call with plan needs to be 10% greater', () => {
      //Arrange
      const longCallDuration = CallDurationInMinutes.create(120);
      const chargesService = CallService.getCallCharges(
        planMock,
        tariffMock,
        longCallDuration,
      );

      //Act
      const totalCharges = calculateCharges(
        planMock,
        tariffMock,
        longCallDuration.value,
      );

      //Assert
      expect(chargesService.withPlan).toEqual(totalCharges.withPlan);
    });
  });
});

function calculateCharges(plan: Plan, tariff: Tariff, minutes: number) {
  const minutesDiscount = plan.getPlanMinutesDiscount();
  let withPlanCharge = tariff.getTotalValue(minutes - minutesDiscount);
  withPlanCharge += (withPlanCharge / 100) * 10;
  return {
    withPlan: withPlanCharge.toFixed(2),
    withoutPlan: tariff.getTotalValue(minutes).toFixed(2),
  };
}
