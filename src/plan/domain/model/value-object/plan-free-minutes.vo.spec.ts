import { BadRequestException } from "@nestjs/common"
import { PlanFreeMinutes } from "./plan-free-minutes.vo"

describe("PlanFreeMinutes UNIT tests", () => {
	describe("VALID inputs", () => {
		it.each([
			[1],
			[10],
			[30],
			[60],
			[120]
		])("should be defined with when received integer values greater than 1. value passed %s", (freeMinutes) => {
			//Arrange
			const planFreeMinutes = PlanFreeMinutes.create(freeMinutes)
	
			//Assert
			expect(planFreeMinutes).toBeDefined()
		})
	})

	describe("INVALID inputs", () => {
		it.each([
			[0],
			[-1],
			[-10],
			[-11.11],
			[1.11],
			[2.50],
			[null],
			[undefined]
		])("should throw a exception when received values lower than 1 or a float number. value passed %s", (invalidFreeMinutes) => {
			//Assert
			expect(() => PlanFreeMinutes.create(invalidFreeMinutes)).toThrow(BadRequestException)
		})
	})
	
})