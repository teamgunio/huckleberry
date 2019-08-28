import { Controller, Get, Put, Request } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { Integration } from './integration.entity';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get('/api/integrations')
  async fetch(): Promise<Integration[]> {
    return this.integrationService.findAll();
  }
}
