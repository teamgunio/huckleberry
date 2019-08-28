import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { Integration } from './integration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Integration])],
  providers: [IntegrationService],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
