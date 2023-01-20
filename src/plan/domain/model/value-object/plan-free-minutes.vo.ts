import { BadRequestException } from "@nestjs/common";

export class PlanFreeMinutes {
	private constructor(public readonly value: number) {}

	static create(value: number) {
		this.isValidPlanName(value)

		return new PlanFreeMinutes(value)
	}
	
	private static isValidPlanName(value: number) {
		if(!value || value < 1) {
			throw new BadRequestException("O plano deve conter um numero valido de minutos gratis")
		}

		if(parseInt(String(value)) != value) {
			throw new BadRequestException("A quantidade de minutos deve ser um numero inteiro")
		}
	}
}