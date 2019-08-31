import { Controller, Get, Put, Post, Delete, Request } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from './skill.entity';

@Controller()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('/api/skills')
  async fetch(@Request() req): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Post('/api/skills')
  async create(@Request() req): Promise<Skill> {
    const skill = await this.skillsService.create(req.user, req.body.skill);
    return skill;
  }

  @Delete('/api/skills/:id')
  async delete(@Request() req): Promise<string> {
    await this.skillsService.delete(req.user, req.params.id);
    return 'ok';
  }
}
