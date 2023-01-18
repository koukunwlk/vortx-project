import { PlanModel } from "./plan.model"

describe("Plan model UNIT tests", () => {
	describe("when given a valid input", () => {
		it("should be defined", () => {
			//Arrange
			const plan = new PlanModel({name: "FaleMais30", durationInMinutes: 30})

			//Assert
			expect(plan).toBeDefined()
		})

		it("should return the duration of the plan ", () => {
			//Arrange
			const input = {name: "FaleMais30", durationInMinutes: 30}
			const plan = new PlanModel(input)

			//Act
			const minutesDiscount = plan.getPlanMinutesDiscount()
			
			//Assert
			expect(minutesDiscount).toEqual(input.durationInMinutes)
		})
	})
})