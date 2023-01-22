import { ListTariffOptions, TariffRepository } from '../../../tariff/domain/ports/tariff.repository';
import { IdTool } from '../../../common/utils/IdTool';
import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { PlanService } from '../../../plan/domain/ports/plan.service';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { GetCallChargesUseCase } from './get-call-charges.use-case';
jest.mock('../../../tariff/domain/ports/tariff.repository');
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

class TariffRepositoryMock extends TariffRepository {
	findOne = jest.fn()
	findMany = jest.fn()
	persist = jest.fn()
	update = jest.fn()
}

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
let tariffRepositoryFindOneMock;

describe('GetCallChargesUseCase UNIT tests', () => {
  let getCallChargesUseCase: GetCallChargesUseCase;
  const tariffRepositoryMock = new TariffRepositoryMock()
  beforeEach(() => {
    getCallChargesUseCase = new GetCallChargesUseCase(
	  tariffRepositoryMock,
      PlanService.prototype,
    );

	tariffRepositoryFindOneMock = jest.spyOn(
	  tariffRepositoryMock,
	  "findOne"
    )
    planServiceGetPlanMock = jest.spyOn(PlanService.prototype, 'getPlan');

    tariffRepositoryFindOneMock.mockReturnValue(tariffMock);
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
    expect(tariffRepositoryFindOneMock).toBeCalledWith({
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
	tariffRepositoryFindOneMock.mockReturnValue(undefined)

	//Act && Assert
	expect(getCallChargesUseCase.execute(input)).rejects.toThrow("tariff not found")
  })

});
