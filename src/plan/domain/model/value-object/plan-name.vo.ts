import { BadRequestException } from "@nestjs/common";

export class PlanName {
	private constructor(public readonly value: string) {}

	static create(value: string) {
		this.isValidPlanName(value)

		return new PlanName(value)
	}

	private static isValidPlanName(value: string) {
		if(value && !value.includes("FaleMais")) {
			throw new BadRequestException("O nome do plano deve conter 'FaleMais'")
		}
		if(!value) {
			throw  new BadRequestException("o nome do plano não deve ser vazio")
		}
	}
}