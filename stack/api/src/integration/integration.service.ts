import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Integration } from './integration.entity';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integration)
    private readonly integrationRepository: Repository<Integration>,
  ) {}

  async findAll(): Promise<Integration[]> {
    return await this.integrationRepository.find();
  }

  async create(user: any, props: any): Promise<Integration> {
    const integration = new Integration();
    integration.type = integration.name = props.type;
    integration.user = user.sub;
    integration.createdAt = new Date();
    return await this.integrationRepository.save(integration);
  }
}
