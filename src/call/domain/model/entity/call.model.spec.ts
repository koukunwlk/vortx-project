import { Call } from './call.model';
import { Plan } from '../../../../plan/domain/model/entity/plan.model';
import { Tariff } from '../../../../tariff/domain/model/entity/tariff.model';

let createCallInput;

//Mocks
const tariff: Tariff = Tariff.create({
  origin: '011',
  destination: '016',
  valuePerMinute: 1.9,
});

const plan: Plan = Plan.create({
  name: 'FaleMais30',
  freeMinutes: 30,
});

describe('Call Model UNIT tests', () => {
  beforeEach(() => {
    createCallInput = {
      durationInMinutes: Math.random() * (150 - 0) + 0,
    };
  });

  describe('when input is valid', () => {
    it('should be defined', () => {
      //Arrange
      const call = Call.create(createCallInput);

      //Assert
      expect(call).toBeDefined();
    });

    it('should return the duration of the call', () => {
      //Arrange
      const call = Call.create(createCallInput);

      //Assert
      expect(call.getCallDuration()).toEqual(createCallInput.durationInMinutes);
    });
  });
});
