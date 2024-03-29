import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCallChargesOutput } from 'src/call/domain/use-case/get-call-charges.dto.output';
import { GetCallChargesUseCase } from 'src/call/domain/use-case/get-call-charges.use-case';
import { GetCallChargesInput } from './input/get-call-charges.input';

@Controller('calls')
@ApiTags('Call endpoints')
export class CallController {
  constructor(
    @Inject(GetCallChargesUseCase)
    private readonly getCallChargesUseCase: GetCallChargesUseCase,
  ) {}

  @Post('/simulate')
  @ApiResponse({
    description: 'Return the call charges simulation',
  })
  async getCallCharges(
    @Body() getCallChargesInput: GetCallChargesInput,
  ): Promise<GetCallChargesOutput> {
    const response = await this.getCallChargesUseCase.execute(
      getCallChargesInput,
    );
    return response;
  }
}
