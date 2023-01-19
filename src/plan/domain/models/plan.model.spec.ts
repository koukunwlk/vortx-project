import { Plan } from "./plan.model"

describe("Plan model UNIT tests", () => {

	describe("when given a valid input", () => {
		const input = {name: "FaleMais30", freeMinutes: 30}
		it("should be defined", () => {
			//Arrange
			const plan = new Plan(input)

			//Assert
			expect(plan).toBeDefined()
		})

		it("should return the duration of the plan ", () => {
			//Arrange
			const plan = new Plan(input)

			//Act
			const minutesDiscount = plan.getPlanMinutesDiscount()

			//Assert
			expect(minutesDiscount).toEqual(input.freeMinutes)
		})
	})
})