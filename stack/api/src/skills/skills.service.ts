import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return await this.skillsRepository.find();
  }

  async create(user: any, props: any): Promise<Skill> {
    const skill = new Skill();
    skill.name = props.name;
    skill.type = props.type;
    skill.action = props.action;
    skill.params = props.params;
    skill.provider = props.provider;
    skill.template = props.template;
    skill.createdBy = user.sub;
    skill.createdAt = new Date();
    skill.updatedAt = new Date();
    return await this.skillsRepository.save(skill);
  }

  async delete(user: any, id: string): Promise<boolean> {
    try {
      const skill = await this.skillsRepository.delete(id);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

}
