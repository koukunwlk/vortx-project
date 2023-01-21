import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class GetCallChargesInput {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		default: "011",
		description: "Call origin ddd"
	})
	origin: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		default: "016",
		description: "Call destination ddd"
	})
	destination: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		default: "FalaMais30",
		description: ""
	})
	planName: string


	@IsNumber()
	@Min(1)
	@ApiProperty()
	@ApiProperty({
		default: "1",
		description: "Duration of the call in minutes",
		minimum: 1
	})
	durationInMinutes: number
}