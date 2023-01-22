import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Application Heath')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    description: 'check if application is running',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
