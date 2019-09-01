import { Controller, Get, Put, Post, Delete, Request } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from './skill.entity';

import { ActivitiesService } from '../activities/activities.service';
import { Activity } from '../activities/activity.entity';

@Controller()
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  @Get('/api/skills')
  async fetch(@Request() req): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Post('/api/skills')
  async create(@Request() req): Promise<Skill> {
    const skill = await this.skillsService.create(req.user, req.body.skill);
    return skill;
  }

  @Get('/api/skills/:id')
  async fetchOne(@Request() req): Promise<Skill> {
    return await this.skillsService.findOne(req.params.id);
  }

  @Put('/api/skills/:id')
  async update(@Request() req): Promise<Skill> {
    const skill = await this.skillsService.findOne(req.params.id);

    const {
      name,
      action,
      template,
      type,
      state,
    } = req.body.skill;

    const update = {
      ...skill,
      name,
      action,
      template,
      type,
      state,
    };

    const res = await this.skillsService.store(update);
    return skill;
  }

  @Delete('/api/skills/:id')
  async delete(@Request() req): Promise<string> {
    await this.skillsService.delete(req.user, req.params.id);
    return 'ok';
  }

  @Post('/api/skills/:id/run')
  async run(@Request() req): Promise<Activity> {
    const activity = new Activity();
    activity.user = req.user.sub;
    activity.skill = await this.skillsService.findOne(req.params.id);
    activity.startedAt = new Date();
    activity.payload = await this.skillsService.useSkill(req.user, req.params.id);
    activity.completedAt = new Date();

    this.activitiesService.storeActivity(activity);

    return activity;
  }

}
