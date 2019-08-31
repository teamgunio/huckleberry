import { Controller, Get, Put, Post, Delete, Request } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';

@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get('/api/activities')
  async fetch(@Request() req): Promise<Activity[]> {
    return this.activitiesService.findAll(req.user);
  }
}
