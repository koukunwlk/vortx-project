import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { GetCallChargesUseCase } from "src/call/domain/use-cases/get-call-charges.use-case";
import { GetCallChargesInput } from "./input/get-call-charges.input";

@Controller("call")
export class CallController {
	constructor(
		@Inject(GetCallChargesUseCase)
		private readonly getCallChargesUseCase: GetCallChargesUseCase
	){}

	@Post()
	getCallCharges(@Body() getCallChargesInput: GetCallChargesInput) {
		const response = this.getCallChargesUseCase.execute(getCallChargesInput)
		return response
	}
}