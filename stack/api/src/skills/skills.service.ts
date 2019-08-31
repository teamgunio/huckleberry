import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);

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

  async useSkill(user: any, id: string): Promise<boolean> {
    const skill = await this.skillsRepository.findOne(id);
    const {
      template,
    } = skill;

    const cwd:string = await new Promise((resolve, reject) => {
      fs.mkdtemp(path.join(os.tmpdir(), 'tagui-'), (err, folder) => {
        if (err) return reject(err);
        resolve(folder);
      });
    });

    const data = new Uint8Array(Buffer.from(template.toString()));

    await new Promise((resolve, reject) => {
      fs.writeFile(`${cwd}/flow`, data, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const res = await exec(`tagui flow debug`, {
      cwd,
    })

    console.log(res);

    return true;
  }
}
