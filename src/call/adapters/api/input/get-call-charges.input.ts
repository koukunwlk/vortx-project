import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetCallChargesInput {
	@IsString()
	@IsNotEmpty()
	origin: string
	destination: string
	planName: string


	@IsNumber()
	durationInMinutes: number
}