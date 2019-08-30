import { Controller, Get, Put, Post, Request } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { Integration } from './integration.entity';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get('/api/integrations')
  async fetch(): Promise<Integration[]> {
    return this.integrationService.findAll();
  }

  @Post('/api/integrations')
  async create(@Request() req): Promise<string> {
    await this.integrationService.create(req.user, req.body.integration);
    return 'ok';
  }

  @Post('/api/integrations/:id/authorize')
  async authorize(@Request() req): Promise<string> {
    await this.integrationService.authorize(req.user, req.params.id, req.body.code)
    return 'ok';
  }
}
