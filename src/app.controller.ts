import { Controller, Get, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Application Health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    description: 'Redirect for docs pages',
  })
  redirect(@Res() response): string {
	response.redirect("/docs")
    return this.appService.getHello();
  }

  @Get("health")
  @ApiResponse({
    description: 'Check if application is running',
  })
  verifyHealth() {
	return this.appService.getHello()
  }
}
