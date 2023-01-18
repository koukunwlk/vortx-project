import { Controller, Get, Inject } from "@nestjs/common";
import { GetCallChargesUseCase } from "src/call/domain/use-cases/get-call-charges.use-case";

@Controller("call")
export class CallController {
	constructor(
		@Inject(GetCallChargesUseCase)
		private readonly getCallChargesUseCase: GetCallChargesUseCase
	){}

	@Get()
	getCallCharges() {
		const response = this.getCallChargesUseCase.execute()
		return response
	}
}