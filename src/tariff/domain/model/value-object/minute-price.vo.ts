import { BadGatewayException } from '@nestjs/common';

export class MinutePrice {
  private constructor(readonly value: number) {}

  static create(value: number) {
    this.validateMinutePrice(value);

    return new MinutePrice(value);
  }

  private static validateMinutePrice(value: number) {
    if (value < 0) {
      throw new BadGatewayException(
        'O preço do minuto da tarifa deve ser um valor positivo',
      );
    }
  }
}
