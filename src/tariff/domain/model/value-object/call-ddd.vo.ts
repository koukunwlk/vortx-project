import { BadRequestException } from '@nestjs/common';

export class CallDdd {
  private constructor(readonly value: string) {}

  private static dddRegex = RegExp(/^0[1-9][0-9]$/)
  static create(value: string) {
    this.isValidCallDdd(value);

    return new CallDdd(value);
  }

  private static isValidCallDdd(value: string) {
	if(!this.dddRegex.test(value)) {
		throw new BadRequestException("ddd invalido")
	}
  }
}
