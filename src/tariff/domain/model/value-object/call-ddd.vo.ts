import { BadRequestException } from "@nestjs/common";

export class CallDdd {
	private constructor(readonly value: string) {}

	static create(value: string) {
		this.isValidCallDdd(value)
		
		return new CallDdd(value)
	}

	private static isValidCallDdd(value: string) {
		const parsedValue = Number(value)
		if(value[0] != "0") {
			throw new BadRequestException("O ddd deve começar com 0")
		}

		if(value.length != 3) {
			throw new BadRequestException("O ddd deve conter 3 números")
		}

		if(isNaN(parsedValue)){
			throw new BadRequestException("O ddd deve conter apenas números")
		}
		
		if(parsedValue === 0) {
			throw new BadRequestException("O ddd 000 é invalido")
		}
	}
}