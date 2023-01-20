import { BadRequestException } from "@nestjs/common"
import { PlanName } from "./plan-name.vo"

describe("PlanName UNIT tests", () => {
	describe("VALID inputs", () => {
		it.each([
			["FaleMais30"],
			["FaleMais60"],
			["FaleMais120"],
			["FaleMais240"],
		])("should be defined when plan name contains \"FaleMais\" passed value %s", (name) => {
			// Arrange
			const planName = PlanName.create(name)

			//Assert
			expect(planName).toBeDefined()
		})
	})

	describe("INVALID inputs", () => {
		it.each([
			["commonPlan"],
			["  "],
			[null],
			[undefined],
			["wrongPLan"]
		])("should be defined when plan name contains \"FaleMais\" passed value %s", (invalidName) => {
			// Assert
			expect(() => PlanName.create(invalidName)).toThrow(BadRequestException)
		})
	})
})