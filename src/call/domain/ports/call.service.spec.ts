import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { Call } from '../model/entity/call.model';
import { CallService } from './call.service';

const callMock = Call.create({
  durationInMinutes: 15,
});
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
        callMock,
      );

      //Act
      const totalCharges = calculateCharges(
        planMock,
        tariffMock,
        callMock.getCallDuration(),
      );

      //Assert
      expect(chargesService.withoutPlan).toEqual(totalCharges.withoutPlan);
    });

    it('should calculate the total cost of the call with plan needs to be 10% greater', () => {
      //Arrange
	  const longCall = Call.create({durationInMinutes: 120})
      const chargesService = CallService.getCallCharges(
        planMock,
        tariffMock,
        longCall,
      );

      //Act
      const totalCharges = calculateCharges(
        planMock,
        tariffMock,
        longCall.getCallDuration(),
      );

      //Assert
      expect(chargesService.withPlan).toEqual(totalCharges.withPlan);
    });
  });
});

function calculateCharges(plan: Plan, tariff: Tariff, minutes: number) {
  const minutesDiscount = plan.getPlanMinutesDiscount();
  let withPlanCharge = tariff.getTotalValue(minutes - minutesDiscount);
  withPlanCharge += (withPlanCharge / 100) * 10
  return {
    withPlan: withPlanCharge.toFixed(2),
    withoutPlan: tariff.getTotalValue(minutes).toFixed(2),
  };
}
