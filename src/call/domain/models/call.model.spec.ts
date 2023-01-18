import { CallModel } from './call.model';
import { PlanModel } from '../../../plan/domain/models/plan.model';
import { TariffModel } from '../../../tariff/domain/models/tariff.model';
import { CreateCallInput } from '../dto/input/create-call.input';

let createCallInput: CreateCallInput;
//Mocks
const tariff: TariffModel = new TariffModel({
  origin: '011',
  destination: '016',
  valuePerMinute: 1.9,
});

const plan: PlanModel = new PlanModel({
  name: 'FaleMais30',
  durationInMinutes: 30,
});

describe('Call Model UNIT tests', () => {
  beforeEach(() => {
    createCallInput = {
      tariff,
      plan,
      durationInMinutes: Math.random() * (150 - 0) + 0,
    };
  });

  describe('when input is valid', () => {
    it('should create a new call model WITH plan', () => {
      //Arrange
      const call = new CallModel(createCallInput);

      //Assert
      expect(call).toBeDefined();
    });
  });

  describe('validating domain rules', () => {
    it('should calculate the total cost of the call without plan', () => {
      //Arrange
      const call = new CallModel(createCallInput);

      //Act
      const totalCharges = calculateCharges(
        plan,
        tariff,
        createCallInput.durationInMinutes,
      );
      const callTotalCharges = call.getCallCharges();

      //Assert
      expect(callTotalCharges.withoutPlan).toEqual(totalCharges.withoutPlan);
    });

    it('should calculate the total cost of the call with plan needs to be 10% greater', () => {
      //Arrange
      const call = new CallModel(createCallInput);

      //Act
      const totalCharges = calculateCharges(
        plan,
        tariff,
        createCallInput.durationInMinutes,
      );
      const callTotalCharges = call.getCallCharges();

      //Assert
      expect(callTotalCharges.withPlan).toEqual(totalCharges.withPlan);
    });
  });
});

function calculateCharges(
  plan: PlanModel,
  tariff: TariffModel,
  minutes: number,
) {
  const minutesDiscount = plan.getPlanMinutesDiscount();
  let withPlanCharge = tariff.getTotalValue(minutes - minutesDiscount)

  withPlanCharge += (withPlanCharge / 100) * 10;
  return {
    withPlan: withPlanCharge,
    withoutPlan: tariff.getTotalValue(minutes),
  };
}
