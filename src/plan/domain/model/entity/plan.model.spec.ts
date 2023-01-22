import { IdTool } from '../../../../common/utils/Id-tool';
import { Plan } from './plan.model';

describe('Plan model UNIT tests', () => {
  describe('when given a valid input', () => {
    const input = { name: 'FaleMais30', freeMinutes: 30 };
    it('should be defined', () => {
      //Arrange
      const plan = Plan.create(input);

      //Assert
      expect(plan).toBeDefined();
    });

    it('should store given ID', () => {
      //Arrange
      const idToStore = IdTool.generate();
      const plan = Plan.create(input, idToStore);

      //Assert
      expect(plan.id).toEqual(idToStore);
    });

    it('should return the duration of the plan ', () => {
      //Arrange
      const plan = Plan.create(input);

      //Act
      const minutesDiscount = plan.getPlanMinutesDiscount();

      //Assert
      expect(minutesDiscount).toEqual(input.freeMinutes);
    });
  });
});
