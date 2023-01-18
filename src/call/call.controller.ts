import { Controller, Post, Body} from '@nestjs/common';

@Controller('call')
export class CallController {
  constructor(private readonly callService) {}

  @Post()
  create(@Body() createCallDto) {
    return this.callService.create(createCallDto);
  }
}
