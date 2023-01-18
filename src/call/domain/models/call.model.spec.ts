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

describe('Call Model UNIT TESTS', () => {
  beforeEach(() => {
    createCallInput = {
      tariff,
	  plan,
	  durationInMinutes: Math.random() * (150 - 0) + 0
    };
  });

  describe('when input is valid', () => {
    it('should create a new call model WITH plan', () => {
	  //Arrange
      const call = new CallModel(createCallInput);

	  //Assert
	  expect(call).toBeDefined();
    });

	it('should create a new call model WITHOUT plan', () => {
		//Arrange
		const call = new CallModel({...createCallInput, plan: undefined});
  
		//Assert
		expect(call).toBeDefined();
	  });
  });

  it("should calculate the total cost of the call", () => {
		//Arrange
		const call = new CallModel(createCallInput);

		//Act
		const totalCharges =  calculateCallCost(plan, tariff, createCallInput.durationInMinutes)
		const totalCost = call.getCallCharges();

		//Assert
		expect(totalCost).toEqual(totalCharges)
  })

  

});

function calculateCallCost(plan: PlanModel, tariff: TariffModel, minutes: number) {
	const minutesDiscount = plan.getPlanMinutesDiscount()
	return {
		withPlan: tariff.getTotalValue(minutes - minutesDiscount),
		withoutPlan: tariff.getTotalValue(minutes)
	}
}