import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';


@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async storeActivity(activity: Activity): Promise<Activity> {
    return await this.activityRepository.save(activity);
  }

  async findAll(user: string): Promise<Activity[]> {
    return await this.activityRepository.find();
  }
}
