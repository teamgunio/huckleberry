import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/version')
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
