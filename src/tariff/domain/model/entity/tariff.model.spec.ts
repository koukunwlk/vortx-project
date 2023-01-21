import { IdTool } from "../../../../common/utils/IdTool"
import { Tariff } from "./tariff.model"

describe("Tariff Model UNIT tests", () => {
	const input =  {origin: "011", destination: "016", valuePerMinute: 1.90}
	describe("when given a valid input", () => {
		it("should be defined", () => {
			//Arrange
			const tariff = Tariff.create(input)

			//Assert
			expect(tariff).toBeDefined()
		})

		it("should store given ID", () => {
			//Arrange
			const idToStore = IdTool.generate()
			const tariff = Tariff.create(input, idToStore)

			//Assert
			expect(tariff.id).toEqual(idToStore)
		})
	})

	describe("when using getTotalValue method", () => {
		it.each([[5], [10], [20], [40], [80]])("should calculate the charges of a call with %s of durations", (minutes) => {
			//Arrange
			const tariff = Tariff.create(input)
	
			//Act
			const charges = tariff.getTotalValue(minutes)

			//Assert
			expect(charges).toEqual(input.valuePerMinute * minutes)
		})
	})
})