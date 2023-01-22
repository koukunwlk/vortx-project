import { BadRequestException } from '@nestjs/common';
import { CallDurationInMinutes } from './call-duration-in-minutes.vo';

describe('CallDurationInMinutes UNIT tests', () => {
  describe('VALID inputs', () => {
    it.each([[1], [10], [30], [60], [120]])(
      'should be defined with when received integer values greater than 1. value passed %s',
      (duration) => {
        //Arrange
        const callDuration = CallDurationInMinutes.create(duration);

        //Assert
        expect(callDuration).toBeDefined();
      },
    );
  });

  describe('INVALID inputs', () => {
    it.each([[0], [-1], [-10], [-11.11], [null], [undefined]])(
      'should throw a exception when received values lower than 1',
      (invalidDuration) => {
        //Assert
        expect(() => CallDurationInMinutes.create(invalidDuration)).toThrow(
          BadRequestException,
        );
      },
    );
  });
});
