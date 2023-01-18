import { TariffModel } from "./tariff.model"

describe("Tariff Model UNIT tests", () => {
	const input =  {origin: "011", destination: "016", valuePerMinute: 1.90}
	describe("when given a valid input", () => {
		it("should be defined", () => {
			//Arrange
			const tariff = new TariffModel(input)

			//Assert
			expect(tariff).toBeDefined()
		})
	})
	describe("when using getTotalValue method", () => {
		it.each([[5], [10], [20], [40], [80]])("should calculate the charges of a call with %s of durations", (minutes) => {
			//Arrange
			const tariff = new TariffModel(input)
	
			//Act
			const charges = tariff.getTotalValue(minutes)
			
			//Assert
			expect(charges).toEqual(input.valuePerMinute * minutes)
		})
	})
})