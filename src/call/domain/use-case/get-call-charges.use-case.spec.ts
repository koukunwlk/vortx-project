import { IdTool } from '../../../common/utils/IdTool';
import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { PlanService } from '../../../plan/domain/ports/plan.service';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { TariffService } from '../../../tariff/domain/ports/tariff.service';
import { GetCallChargesUseCase } from './get-call-charges.use-case';
jest.mock('../../../tariff/domain/ports/tariff.service');
jest.mock('../../../plan/domain/ports/plan.service');

/* Mocks */
const planId = IdTool.generate();
const tariffId = IdTool.generate();
const planMock = Plan.create(
  {
    name: 'FaleMais30',
    freeMinutes: 30,
  },
  planId,
);

const tariffMock = Tariff.create(
  {
    origin: '011',
    destination: '016',
    valuePerMinute: 1.9,
  },
  tariffId,
);

/* Instances */
let planServiceGetPlanMock;
let tariffServiceGetTariffMock;

describe('GetCallChargesUseCase UNIT tests', () => {
  let getCallChargesUseCase: GetCallChargesUseCase;

  beforeEach(() => {
    getCallChargesUseCase = new GetCallChargesUseCase(
      TariffService.prototype,
      PlanService.prototype,
    );

    tariffServiceGetTariffMock = jest.spyOn(
      TariffService.prototype,
      'getTariff',
    );
    planServiceGetPlanMock = jest.spyOn(PlanService.prototype, 'getPlan');

    tariffServiceGetTariffMock.mockReturnValue(tariffMock);
    planServiceGetPlanMock.mockReturnValue(planMock);
  });

  const input = {
    origin: '011',
    destination: '016',
    durationInMinutes: 40,
    planName: 'mockPlan',
  };

  it('should call tariff service', async () => {
    //Act
    await getCallChargesUseCase.execute(input);

    //Assert
    expect(tariffServiceGetTariffMock).toBeCalledWith({
      origin: input.origin,
      destination: input.destination,
    });
  });

  it('should call plan service', async () => {
    //Act
    await getCallChargesUseCase.execute(input);

    //Assert
    expect(planServiceGetPlanMock).toBeCalledWith({
      name: input.planName,
    });
  });

  it('should return the response message', async () => {
	// Act
    const response = await getCallChargesUseCase.execute(input);

    //Assert
    expect(response).toHaveProperty('origin');
    expect(response).toHaveProperty('destination');
    expect(response).toHaveProperty('planName');
    expect(response).toHaveProperty('charges');
    expect(response.charges).toHaveProperty('withPlan');
    expect(response.charges).toHaveProperty('withoutPlan');
  });

  it("should throw exception when plan is undefined", () => {
	//Arrange
	planServiceGetPlanMock.mockReturnValue(undefined)

	//Act && Assert
	expect(getCallChargesUseCase.execute(input)).rejects.toThrow("plan not found")
  })

  it("should throw exception when tariff is undefined", () => {
	//Arrange
	tariffServiceGetTariffMock.mockReturnValue(undefined)

	//Act && Assert
	expect(getCallChargesUseCase.execute(input)).rejects.toThrow("tariff not found")
  })

});
