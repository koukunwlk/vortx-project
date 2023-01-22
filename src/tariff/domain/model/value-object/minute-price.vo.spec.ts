import { BadGatewayException } from '@nestjs/common';
import { MinutePrice } from './minute-price.vo';

describe('MinutePrice UNIT tests', () => {
  describe('VALID inputs', () => {
    it.each([[1], [2.9], [0], [3.45], [4.44444]])(
      'should be defined when price is positive passed value %s',
      (price) => {
        // Arrange
        const minutePrice = MinutePrice.create(price);

        //Assert
        expect(minutePrice).toBeDefined();
      },
    );
  });

  describe('INVALID inputs', () => {
    it.each([[-0.34], [-1], [-3.45], [-10], [-2.32]])(
      'should throw exception when price is negative passed value %s',
      (invalidPrice) => {
        //Assert
        expect(() => MinutePrice.create(invalidPrice)).toThrow(
          BadGatewayException,
        );
      },
    );
  });
});
