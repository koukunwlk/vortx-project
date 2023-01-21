import { BadRequestException } from "@nestjs/common";

export class CallDurationInMinutes {
	private constructor(public readonly value: number) {}

	static create(value: number) {
		this.isValidPlanName(value)

		return new CallDurationInMinutes(value)
	}
	
	private static isValidPlanName(value: number) {
		if(!value || value < 1) {
			throw new BadRequestException("O tempo de ligação deve ser maior que 0")
		}
	}
}