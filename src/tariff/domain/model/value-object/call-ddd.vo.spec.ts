import { BadRequestException } from '@nestjs/common';
import { CallDdd } from './call-ddd.vo';

describe('CallDdd UNIT tests', () => {
  describe('VALID inputs', () => {
    it.each([['011'], ['012'], ['020'], ['009'], ['035'], ['085'], ['022']])(
      'should be defined when ddd value follow the pattern 0NN where N is a integer number value passed %s',
      (ddd) => {
        //Arrange
        const callDD = CallDdd.create(ddd);

        //Assert
        expect(callDD).toBeDefined();
      },
    );
  });

  describe('INVALID inputs', () => {
    it.each([['111'], ['xpto'], ['01111'], ['01.4533'], ['000']])(
      'should throw exception when value not follow the pattern 0NN passed value %s',
      (invalidDdd) => {
        //Assert
        expect(() => CallDdd.create(invalidDdd)).toThrow(BadRequestException);
      },
    );
  });
});
