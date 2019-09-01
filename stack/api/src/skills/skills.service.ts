import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Skill } from './skill.entity';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);
const writeFile = util.promisify(fs.writeFile);
const mkdtemp = util.promisify(fs.mkdtemp);
const mkdir = util.promisify(fs.mkdir);

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return await this.skillsRepository.find();
  }

  async findOne(id: string): Promise<Skill> {
    return await this.skillsRepository.findOne(id);
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

  async store(skill: Skill): Promise<UpdateResult> {
    return await this.skillsRepository.update(skill.id, skill);
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

  async useSkill(user: any, id: string): Promise<any> {
    const skill = await this.skillsRepository.findOne(id);
    const {
      template,
    } = skill;

    const cwd:string = await mkdtemp(path.join(os.tmpdir(), 'tagui-'));
    const data = new Uint8Array(Buffer.from(template.toString()));

    await writeFile(`${cwd}/flow`, data);

    const res = await exec(`tagui flow`, { cwd });
    console.log(res.stdout);

    return res;
  }
}
