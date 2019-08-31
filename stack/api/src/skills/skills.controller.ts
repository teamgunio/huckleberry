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
}
