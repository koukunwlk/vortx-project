import {  TariffRepository } from '../../../tariff/domain/ports/tariff.repository';
import { IdTool } from '../../../common/utils/IdTool';
import { Plan } from '../../../plan/domain/model/entity/plan.model';
import { Tariff } from '../../../tariff/domain/model/entity/tariff.model';
import { GetCallChargesUseCase } from './get-call-charges.use-case';
import { PlanRepository } from '../../../plan/domain/ports/Plan.repository';

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

class PlanRepositoryMock extends PlanRepository {
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
let planRepositoryFindOneMock;
let tariffRepositoryFindOneMock;

describe('GetCallChargesUseCase UNIT tests', () => {
  let getCallChargesUseCase: GetCallChargesUseCase;
  const tariffRepositoryMock = new TariffRepositoryMock()
  const planRepositoryMock = new PlanRepositoryMock()
  beforeEach(() => {
    getCallChargesUseCase = new GetCallChargesUseCase(
	  tariffRepositoryMock,
      planRepositoryMock
    );

	tariffRepositoryFindOneMock = jest.spyOn(
	  tariffRepositoryMock,
	  "findOne"
    )
    planRepositoryFindOneMock = jest.spyOn(planRepositoryMock, 'findOne');

    tariffRepositoryFindOneMock.mockReturnValue(tariffMock);
    planRepositoryFindOneMock.mockReturnValue(planMock);
  });

  const input = {
    origin: '011',
    destination: '016',
    durationInMinutes: 40,
    planName: 'mockPlan',
  };

  it('should call tariff repository', async () => {
    //Act
    await getCallChargesUseCase.execute(input);

    //Assert
    expect(tariffRepositoryFindOneMock).toBeCalledWith({
      origin: input.origin,
      destination: input.destination,
    });
  });

  it('should call plan repository', async () => {
    //Act
    await getCallChargesUseCase.execute(input);

    //Assert
    expect(planRepositoryFindOneMock).toBeCalledWith({
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
	planRepositoryFindOneMock.mockReturnValue(undefined)

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
